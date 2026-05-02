import path from "path";
import fs from "fs/promises";
import { Queue, Worker } from "bullmq";
import redis from "../config/redis";
import { env } from "../config/envConfig";
import { sendMail } from "./sendMail";
import renderTemplate from "../utils/templateRenderer";

export type ContactMailPayload = {
  name: string;
  email: string;
  message: string;
  phone?: string;
};

const CONTACT_MAIL_QUEUE_NAME = "contact-mail";
const hasRedisQueue = Boolean(env.REDIS_URL);

let contactMailQueue: Queue<ContactMailPayload> | null = null;
let contactMailWorker: Worker<ContactMailPayload> | null = null;

const getQueue = () => {
  if (!hasRedisQueue) {
    return null;
  }

  if (!contactMailQueue) {
    contactMailQueue = new Queue(CONTACT_MAIL_QUEUE_NAME, {
      connection: redis as any,
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 2000,
        },
        removeOnComplete: true,
        removeOnFail: false,
      },
    });
  }

  return contactMailQueue;
};

const getTemplateVars = (payload: ContactMailPayload) => ({
  name: payload.name,
  email: payload.email,
  phone: payload.phone || "N/A",
  message: payload.message,
});

const resolveTemplatePath = async (templateFileName: string) => {
  const candidatePaths = [
    path.join(process.cwd(), "templates", templateFileName),
    path.join(__dirname, "../templates", templateFileName),
  ];

  for (const candidatePath of candidatePaths) {
    try {
      await fs.access(candidatePath);
      return candidatePath;
    } catch {
      continue;
    }
  }

  throw new Error(`Template not found: ${templateFileName}`);
};

const getAdminTemplatePath = () => resolveTemplatePath("contact-admin.html");

const getUserTemplatePath = () => resolveTemplatePath("contact-user.html");

export const sendContactNotificationEmails = async (
  payload: ContactMailPayload,
) => {
  const templateVars = getTemplateVars(payload);
  const [adminTemplatePath, userTemplatePath] = await Promise.all([
    getAdminTemplatePath(),
    getUserTemplatePath(),
  ]);

  const [adminHtml, userHtml] = await Promise.all([
    renderTemplate(adminTemplatePath, templateVars),
    renderTemplate(userTemplatePath, templateVars),
  ]);

  await sendMail({
    to: env.ADMIN_EMAIL,
    subject: `New contact from ${payload.name}`,
    html: adminHtml,
  });

  await sendMail({
    to: payload.email,
    subject: `Thanks for contacting us, ${payload.name}`,
    html: userHtml,
  });
};

export const enqueueContactNotificationEmails = async (
  payload: ContactMailPayload,
) => {
  const queue = getQueue();
  if (!queue) {
    return false;
  }

  try {
    await queue.add(CONTACT_MAIL_QUEUE_NAME, payload);
    return true;
  } catch (error) {
    console.error("Failed to enqueue contact mail job", error);
    return false;
  }
};

export const startContactMailQueueWorker = async () => {
  const queue = getQueue();
  if (!queue || contactMailWorker) {
    return;
  }

  contactMailWorker = new Worker(
    CONTACT_MAIL_QUEUE_NAME,
    async (job: any) => {
      console.log(`Processing contact mail job ${job.id}`);
      await sendContactNotificationEmails(job.data);
      console.log(`Completed contact mail job ${job.id}`);
    },
    {
      connection: redis as any,
      concurrency: 2,
      lockDuration: 120000,
      stalledInterval: 60000,
    },
  );

  contactMailWorker.on("completed", (job: any) => {
    console.log(`Contact mail job ${job.id} completed`);
  });

  contactMailWorker.on("failed", (job: any, err: any) => {
    console.error(`Contact mail job ${job?.id} failed: ${err.message}`);
  });

  console.log("Contact mail queue worker started");
};

export const stopContactMailQueueWorker = async () => {
  if (contactMailWorker) {
    await contactMailWorker.close();
    contactMailWorker = null;
    console.log("Contact mail queue worker stopped");
  }
};

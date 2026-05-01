import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { env } from "../config/envConfig";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  secure: env.SMTP_SECURE === "true" ? true : false,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

export type SendMailOptions = {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
};

export const sendMail = async (opts: SendMailOptions) => {
  const mailOptions: Mail.Options = {
    from: opts.from || `${env.EMAIL_USER}`,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
  };

  // basic retry
  const maxRetries = 2;
  let lastError: any = null;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const info = await transporter.sendMail(mailOptions);
      return info;
    } catch (err) {
      lastError = err;
      // wait a bit before retrying
      await new Promise((r) => setTimeout(r, 200 * (attempt + 1)));
    }
  }

  throw lastError;
};

export default transporter;

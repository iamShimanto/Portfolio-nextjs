import { Resend } from "resend";
import { env } from "../config/envConfig";

const resend = new Resend(env.RESEND_API_KEY);

export type SendMailOptions = {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
};

export const sendMail = async (opts: SendMailOptions) => {
  const from = opts.from || env.EMAIL_FROM;

  const maxRetries = 2;
  let lastError: any = null;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const { data, error } = await resend.emails.send({
        from,
        to: Array.isArray(opts.to) ? opts.to : [opts.to],
        subject: opts.subject,
        ...(opts.html ? { html: opts.html } : { text: opts.text ?? "" }),
      });

      if (error) throw error;
      return data;
    } catch (err) {
      lastError = err;
      await new Promise((r) => setTimeout(r, 200 * (attempt + 1)));
    }
  }

  throw lastError;
};

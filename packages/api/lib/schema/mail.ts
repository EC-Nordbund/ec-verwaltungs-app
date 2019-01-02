import { query } from "./mysql";
import { createTransport } from "nodemailer";
// import * as smtpConfig from '../../smtp.json';
const smtpConfig = require("../../smtp.json");
interface empfaenger {
  to: string;
  cc?: string;
  bcc?: string;
}

export default async function sendMail(
  from: string,
  e: empfaenger,
  subject: string,
  body: string,
  isHTML = true,
  attachments: {
    content: string;
    filename: string;
  }[] = []
) {
  const smtp = createTransport(smtpConfig);
  const mailData = {
    from,
    to: e.to,
    cc: e.cc || "",
    bcc: e.bcc || "",
    subject,
    ...(isHTML ? { html: body } : { text: body }),
    attachments: attachments.map(at => ({
      ...at,
      encoding: "base64"
    }))
  };
  await smtp.sendMail(mailData);
  await query(
    `INSERT INTO gesendeteEmails (content) VALUES ('${JSON.stringify(
      mailData
    )}')`
  );

  return true;
}

import * as fs from 'fs';
import { createTransport } from 'nodemailer';
import * as path from 'path';

interface empfaenger {
  to: string;
  cc?: string;
  bcc?: string;
}

export default async function sendMail(
  from: string,
  empfaenger: empfaenger,
  subject: string,
  body: string,
  isHTML: boolean = true,
  attachments: Array<{
    content: string;
    filename: string;
  }> = []
) {
  await createTransport(
    JSON.parse(fs.readFileSync(path.join(__dirname, "../smtp.json"), "utf8"))
  ).sendMail({
    from,
    to: empfaenger.to,
    cc: empfaenger.cc || "",
    bcc: empfaenger.bcc || "",
    subject,
    ...(isHTML ? {html: body} : {text: body}),
    attachments: attachments.map(attachment => ({
      ...attachment,
      encoding: "base64"
    }))
  });

  return true;
}

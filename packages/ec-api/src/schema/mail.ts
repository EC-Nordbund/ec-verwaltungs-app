import { query } from './mysql';
import { createTransport } from 'nodemailer';

interface empfaenger {
  to: string
  cc?: string
  bcc?: string
}

export default async function sendMail(
  from: string,
  e: empfaenger,
  subject: string,
  body: string,
  isHTML: boolean = true,
  attachments: Array<{
    content: string
    filename: string
  }> = [],
) {
  const smtp = createTransport(eval("require('../../smtp.json')"))
  const mailData = {
    from,
    to: e.to,
    cc: e.cc || '',
    bcc: e.bcc || '',
    subject,
    ...(isHTML ? { html: body } : { text: body }),
    attachments: attachments.map(at => ({
      ...at,
      encoding: 'base64',
    })),
  }
  await smtp.sendMail(mailData)
  await query(`INSERT INTO gesendeteEmails (content) VALUES ('${JSON.stringify(mailData)}')`)

  return true
}

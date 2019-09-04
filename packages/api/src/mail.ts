import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: parseInt(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD
  }
});

export default (mailOps: Mail.Options) => {
  return transporter.sendMail(mailOps)
}
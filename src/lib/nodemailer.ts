import nodemailer from "nodemailer";
import { GMAIL_APP_PASSWORD, GMAIL_EMAIL } from "../config";

// export const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: GMAIL_EMAIL,
//     pass: GMAIL_APP_PASSWORD,
//   },
// });



export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // pakai TLS (STARTTLS)
  auth: {
    user: GMAIL_EMAIL,
    pass: GMAIL_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // opsional: hindari sertifikat error
  },
  connectionTimeout: 10000, // (10 detik timeout)
});

import nodemailer from "nodemailer";
import { user } from "@prisma/client";
import { EMAIL_PASS, EMAIL_USER } from "../constants/ENV.js";

export const createTransporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    // eslint-disable-next-line no-undef
    user: EMAIL_USER, // Your email
    // eslint-disable-next-line no-undef
    pass: EMAIL_PASS, // Your email password
  },
});

/**
 *
 * @param user user who will receive the email
 * @param message the message you will send with the email
 * @param subject the title of the email
 */
const sendEmail = async (user: user, message: string, subject: string) => {
  const transporter = createTransporter;
  await transporter.sendMail({
    // eslint-disable-next-line no-undef
    from: `Unit <${EMAIL_USER}>`,
    to: user.email,
    subject: subject,
    html: ` 
    <html>
      <body style="background-color: #f3f4f6; font-family: 'Segoe UI', sans-serif; margin: 0; padding: 0;">
        ${message}
      </body>
    </html>`,
  });
};

export { sendEmail };

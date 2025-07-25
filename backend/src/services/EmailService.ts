import { documentation, user } from "@prisma/client";
import { sendEmailToQueue } from "../producer/email.producer.js";
import {
  generateDocsMessage,
  generateQuizMessage,
  generateTaskMessage,
  sendHelloToUser,
} from "../utils/messages/generateMessage.js";

class EmailService {
  async sendDocsEmail(users: user[], docs: documentation, subject: string) {
    for (const u of users) {
      const message = generateDocsMessage(u, docs);
      await sendEmailToQueue({ user: u, subject, message });
    }
  }
  async sendTaskEmail(users: user[], task: any, subject: string) {
    for (const u of users) {
      const message = generateTaskMessage(u, task);
      await sendEmailToQueue({ user: u, subject, message });
    }
  }
  async sendQuizEmail(users: user[], task: any, subject: string) {
    for (const u of users) {
      const message = generateQuizMessage(u, task);
      await sendEmailToQueue({ user: u, subject, message });
    }
  }
  async sendHello(user: user) {
    const message = sendHelloToUser(user);
    sendEmailToQueue({
      user: user,
      subject: "مرحباً بك في منصتنا",
      message,
    });
  }
}

export const emailService = new EmailService();

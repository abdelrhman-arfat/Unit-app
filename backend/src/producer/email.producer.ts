import { user } from "@prisma/client";
import { getChannel } from "../config/RabbitMQ.js";

interface EmailJob {
  user: user;
  subject: string;
  message: string;
}

export const sendEmailToQueue = async (job: EmailJob) => {
  const channel = getChannel();
  channel.sendToQueue("emailQueue", Buffer.from(JSON.stringify(job)));
};

import amqp from "amqplib";
import { RABBITMQ_URL } from "../constants/ENV.js";
import { sendEmail } from "../config/NodeMailer.js";
const startWorker = async () => {
  const connection = await amqp.connect(RABBITMQ_URL as string);
  const channel = await connection.createChannel();
  await channel.assertQueue("emailQueue");
  channel.consume("emailQueue", async (msg) => {
    if (!msg) return;
    const job = JSON.parse(msg.content.toString());
    await sendEmail(job.user, job.message, job.subject);
    channel.ack(msg);
  });
};

startWorker();

import amqp from "amqplib";
import { RABBITMQ_URL } from "../constants/ENV.js";

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  const connection = await amqp.connect(RABBITMQ_URL as string);
  channel = await connection.createChannel();
  await channel.assertQueue("emailQueue");
  console.log("✅ RabbitMQ connected & emailQueue created");
};

export const getChannel = () => channel;

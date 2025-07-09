import { PrismaClient, event } from "@prisma/client";

const prisma = new PrismaClient();

class EventService {
  async create(data: Omit<event, "id" | "createdAt" | "updatedAt">) {
    return await prisma.event.create({ data });
  }

  async getAll(skip?: number, limit?: number) {
    return await prisma.event.findMany({
      ...(skip && { skip }),
      ...(limit && { take: limit }),
      orderBy: { createdAt: "desc" },
    });
  }

  async getById(id: number) {
    return await prisma.event.findUnique({ where: { id } });
  }

  async update(id: number, data: Partial<event>) {
    return await prisma.event.update({ where: { id }, data });
  }

  async delete(id: number) {
    return await prisma.event.delete({ where: { id } });
  }
}

export const eventService = new EventService();

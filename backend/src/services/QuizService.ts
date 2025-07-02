import { PrismaClient, quiz, user } from "@prisma/client";

const prisma = new PrismaClient();

class QuizService {
  async create(data: Omit<quiz, "id" | "createdAt" | "updatedAt">) {
    return await prisma.quiz.create({ data });
  }
  async getAllForUser(where: any, skip: number, limit: number) {
    return await prisma.quiz.findMany({
      where,
      select: {
        id: true,
        title: true,
        subject: {
          select: {
            name: true,
            grade: true,
            specialization: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      ...(skip && { skip }),
      ...(limit && { take: limit }),
    });
  }
  async getAll(where: any = {}, skip: number, limit: number) {
    return await prisma.quiz.findMany({
      where,
      select: {
        id: true,
        title: true,
        subject: {
          select: {
            name: true,
            grade: true,
            specialization: true,
          },
        },
        creator: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      ...(skip && { skip }),
      ...(limit && { take: limit }),
    });
  }

  async getById(id: number) {
    return await prisma.quiz.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        subject: {
          select: {
            name: true,
            grade: true,
            specialization: true,
          },
        },
        creator: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
        startDate: true,
        duration: true,
        subjectId: true,
      },
    });
  }

  async update(id: number, data: Partial<quiz>) {
    return await prisma.quiz.update({ where: { id }, data });
  }

  async delete(id: number) {
    return await prisma.quiz.delete({ where: { id } });
  }
  async countAll(where?: any) {
    return await prisma.quiz.count({
      where,
    });
  }
}

export const quizService = new QuizService();

import {
  PrismaClient,
  task,
  grades,
  specializations,
  user,
} from "@prisma/client";

const prisma = new PrismaClient();

const taskSelection = {
  id: true,
  title: true,
  description: true,
  startDate: true,
  endDate: true,
  subject: {
    select: {
      name: true,
      specialization: true,
      grade: true,
    },
  },
  creator: {
    select: {
      name: true,
    },
  },
  createdAt: true,
  updatedAt: true,
};

class TaskService {
  async createTask(
    data: Omit<task, "id" | "createdAt" | "updatedAt">
  ): Promise<task> {
    return await prisma.task.create({ data });
  }

  async getAllTasks(where?: any) {
    return await prisma.task.findMany({
      orderBy: { createdAt: "desc" },
      where,
      select: taskSelection,
    });
  }

  async getTasksBySubjectId(subjectId: number) {
    return await prisma.task.findMany({
      where: { subjectId },
      orderBy: { startDate: "asc" },
      select: taskSelection,
    });
  }

  async getTasksWithFilters(filters: {
    grade?: grades;
    specialization?: specializations;
    subjectId?: number;
  }): Promise<task[]> {
    const { grade, specialization, subjectId } = filters;
    const where: any = {};

    if (subjectId) where.subjectId = subjectId;

    if (grade || specialization) {
      where.subject = {};
      if (grade) where.subject.grade = grade;
      if (specialization) where.subject.specialization = specialization;
    }

    return await prisma.task.findMany({
      where,
      include: {
        subject: {
          select: {
            specialization: true,
            grade: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async getTasksByUser(user: user, subjectId?: number | null) {
    return await prisma.task.findMany({
      where: {
        subject: {
          ...(subjectId && { id: subjectId }),
          specialization: user.specialization,
          grade: user.grade,
        },
      },
      orderBy: { createdAt: "desc" },
      select: taskSelection,
    });
  }

  async getTaskById(id: number): Promise<task | null> {
    return await prisma.task.findUnique({ where: { id } });
  }

  async updateTask(id: number, data: Partial<task>): Promise<task> {
    return await prisma.task.update({
      where: { id },
      data,
    });
  }

  async deleteTask(id: number): Promise<task> {
    return await prisma.task.delete({
      where: { id },
    });
  }
}

export const taskService = new TaskService();

import { grades, PrismaClient, specializations, subject } from "@prisma/client";

const prisma = new PrismaClient();

const subjectSelection = {
  id: true,
  name: true,
  specialization: true,
  grade: true,
  createdAt: true,
  updatedAt: true,
};

class SubjectService {
  async create(
    data: Omit<subject, "id" | "createdAt" | "updatedAt">
  ): Promise<subject> {
    return await prisma.subject.create({ data });
  }

  async getAll(): Promise<subject[]> {
    return await prisma.subject.findMany({
      orderBy: { createdAt: "desc" },
      select: subjectSelection,
    });
  }

  async getById(id: number): Promise<subject | null> {
    return await prisma.subject.findUnique({
      where: { id },
      select: subjectSelection,
    });
  }

  async update(id: number, data: Partial<subject>): Promise<subject> {
    return await prisma.subject.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<subject> {
    return await prisma.subject.delete({
      where: { id },
    });
  }

  async getSubjectByUserData(
    grade: grades,
    specialization: specializations
  ): Promise<subject[]> {
    return await prisma.subject.findMany({
      where: { grade: grade, specialization: specialization },
      select: subjectSelection,
    });
  }
}

export const subjectService = new SubjectService();

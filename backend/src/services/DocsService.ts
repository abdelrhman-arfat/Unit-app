import {
  PrismaClient,
  documentation,
  grades,
  specializations,
  user,
} from "@prisma/client";
import { title } from "process";

const prisma = new PrismaClient();

const docSelection = {
  id: true,
  title: true,
  description: true,
  link: true,
  subjectId: true,
  uploaderId: true,
  isDeleted: true,
  deletedAt: true,
  createdAt: true,
  updatedAt: true,
};

class DocsService {
  async createDoc(
    data: Omit<
      documentation,
      "id" | "createdAt" | "updatedAt" | "isDeleted" | "deletedAt"
    >
  ): Promise<documentation> {
    return await prisma.documentation.create({
      data,
    });
  }

  async getAllDocs(
    where: any = {},
    skip?: number,
    limit?: number
  ): Promise<documentation[]> {
    return await prisma.documentation.findMany({
      where,
      ...(skip && { skip }),
      ...(limit && { take: limit }),
      orderBy: { createdAt: "desc" },
      select: docSelection,
    });
  }

  async getDocById(id: number): Promise<documentation | null> {
    return await prisma.documentation.findFirst({
      where: { id, isDeleted: false },
      select: docSelection,
    });
  }

  async updateDoc(
    id: number,
    data: Partial<documentation>
  ): Promise<documentation> {
    return await prisma.documentation.update({
      where: { id },
      data,
    });
  }

  async softDeleteDoc(id: number): Promise<documentation> {
    return await prisma.documentation.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }

  async getDocsBySubjectId(subjectId: number): Promise<documentation[]> {
    return await prisma.documentation.findMany({
      where: {
        subjectId,
        isDeleted: false,
      },
      orderBy: { createdAt: "asc" },
      select: docSelection,
    });
  }

  async getDocsByGrade(grade: grades): Promise<documentation[]> {
    return await prisma.documentation.findMany({
      where: {
        subject: {
          grade,
        },
        isDeleted: false,
      },
      include: {
        subject: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async getDocsBySpecialization(
    specialization: specializations
  ): Promise<documentation[]> {
    return await prisma.documentation.findMany({
      where: {
        subject: {
          specialization,
        },
        isDeleted: false,
      },
      orderBy: { createdAt: "desc" },
    });
  }
  async getDocsForTheUser(user: user, where?: any) {
    return await prisma.documentation.findMany({
      where: {
        ...where,
        subject: {
          grade: user.grade,
          specialization: user.specialization,
        },
      
        isDeleted: false,
      },
      orderBy: { createdAt: "desc" },
    });
  }
  async countDocs(where: any = {}): Promise<number> {
    return await prisma.documentation.count({ where });
  }
}

export const docsService = new DocsService();

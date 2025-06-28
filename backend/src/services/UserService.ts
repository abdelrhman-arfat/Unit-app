import {
  PrismaClient,
  user,
  roles,
  grades,
  specializations,
  communityRoles,
} from "@prisma/client";

const prisma = new PrismaClient();

class UserService {
  async getUserById(id: string): Promise<user | null> {
    return await prisma.user.findUnique({
      where: { id: Number(id) },
    });
  }

  async getUserByEmail(email: string): Promise<user | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async updateUserById(id: string, data: Partial<user>): Promise<user> {
    return await prisma.user.update({
      where: { id: Number(id) },
      data,
    });
  }

  async createUser(
    data: Omit<user, "id" | "createdAt" | "updatedAt">
  ): Promise<user> {
    return await prisma.user.create({
      data,
    });
  }

  async getUsersByRole(role: roles): Promise<user[]> {
    return await prisma.user.findMany({
      where: { role },
    });
  }

  async getUsersByGrade(grade: grades): Promise<user[]> {
    return await prisma.user.findMany({
      where: { grade },
    });
  }

  async getUsersBySpecialization(
    specialization: specializations
  ): Promise<user[]> {
    return await prisma.user.findMany({
      where: { specialization },
    });
  }

  async getUsersByCommunity(communityName: string): Promise<user[]> {
    return await prisma.user.findMany({
      where: { communityName },
    });
  }

  async getUsersByCommunityRole(role: communityRoles): Promise<user[]> {
    return await prisma.user.findMany({
      where: { communityRole: role },
    });
  }
}

export const userService = new UserService();

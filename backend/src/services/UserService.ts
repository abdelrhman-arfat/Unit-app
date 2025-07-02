import {
  PrismaClient,
  user,
  roles,
  grades,
  specializations,
  communityRoles,
} from "@prisma/client";

const prisma = new PrismaClient();

const userSelection = {
  id: true,
  name: true,
  email: true,
  image: true,
  role: true,
  grade: true,
  specialization: true,
  communityName: true,
};

class UserService {
  async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id: Number(id) },
      select: userSelection,
    });
  }

  async getUserByEmail(email: string): Promise<user | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async updateUserById(id: string, data: Partial<user>) {
    return await prisma.user.update({
      where: { id: Number(id) },
      data,
      select: userSelection,
    });
  }

  async deleteUserById(id: string) {
    return await prisma.user.delete({
      where: { id: Number(id) },
    });
  }

  async updateUserRole(id: string, role: roles) {
    return await prisma.user.update({
      where: { id: Number(id) },
      data: { role },
      select: {
        id: true,
        role: true,
        email: true,
      },
    });
  }

  async createUser(
    data: Omit<user, "id" | "createdAt" | "updatedAt">
  ): Promise<user> {
    return await prisma.user.create({
      data,
    });
  }

  async getUsersByCommunity(
    communityName: string,
    skip?: number,
    limit?: number
  ) {
    return await prisma.user.findMany({
      ...(skip && { skip }),
      ...(limit && { take: limit }),
      where: { communityName },
      select: userSelection,
    });
  }

  async getAllUsers(where: any, skip?: number, limit?: number) {
    return await prisma.user.findMany({
      ...(skip && { skip }),
      ...(limit && { take: limit }),
      where,
      select: userSelection,
    });
  }

  async getUsersPageAvailable(where: any) {
    return await prisma.user.count({ where });
  }
}

export const userService = new UserService();

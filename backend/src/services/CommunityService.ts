import { community, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const select = {
  id: true,
  name: true,
  description: true,
  image: true,
};

class CommunityService {
  async getAll() {
    return await prisma.community.findMany({
      select: {
        image: true,
        name: true,
        description: true,
      },
    });
  }

  async createNewCommunity(name: string, description: string, image: string) {
    return await prisma.community.create({
      data: {
        name,
        description,
        image,
      },

      select: select,
    });
  }

  async getCommunityById(id: string) {
    return await prisma.community.findUnique({
      where: { id: Number(id) },
      select,
    });
  }

  async getCommunityByName(name: string) {
    return await prisma.community.findUnique({
      where: { name },
      select,
    });
  }

  async deleteCommunityById(id: string) {
    return await prisma.community.delete({
      where: { id: Number(id) },
      select,
    });
  }

  async updateCommunityById(id: string, data: Partial<community>) {
    return await prisma.community.update({
      where: { id: Number(id) },
      data,
      select,
    });
  }
}

export const communityService = new CommunityService();

import { Gym, Prisma } from "@prisma/client";
import { GymRepository } from "../gym-repository";
import { prisma } from "@/lib/prisma";

export class PrismaGymRepository implements GymRepository {
  async findById(id: string): Promise<Gym | null> {
    return await prisma.gym.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    return await prisma.gym.create({
      data,
    });
  }

  async findManyNerby({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) {
    const queryRow = await prisma.$queryRaw`
    ${latitude} ${longitude}
    `;
    return queryRow;
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const pageSize = 10;
    return await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }
}

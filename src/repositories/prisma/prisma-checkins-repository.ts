import { Prisma, CheckIn } from "@prisma/client";
import { CheckInRepository } from "../check-in-repository";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckinsRepository implements CheckInRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkins = await prisma.checkIn.create({ data });
    return checkins;
  }

  async save(data: Prisma.CheckInUncheckedCreateInput): Promise<void> {
    await prisma.checkIn.update({
      where: { id: data.id },
      data,
    });
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const startOfDay = dayjs(date).startOf("date");
    const endOfDay = dayjs(date).endOf("date");

    return await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfDay.toDate(),
          lte: endOfDay.toDate(),
        },
      },
    });
  }

  async findManyByUserId(id: string, page: number): Promise<CheckIn[]> {
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    return await prisma.checkIn.findMany({
      where: { user_id: id },
      skip,
      take: pageSize,
    });
  }

  async countByUserId(userId: string): Promise<number> {
    return await prisma.checkIn.count({
      where: { user_id: userId },
    });
  }

  async findById(id: string): Promise<CheckIn | null> {
    return await prisma.checkIn.findUnique({
      where: { id },
    });
  }
}

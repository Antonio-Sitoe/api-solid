import dayjs from "dayjs";
import { CheckIn, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { CheckInRepository } from "../check-in-repository";

export class inMemoryCheckinRepository implements CheckInRepository {
  public items: CheckIn[] = [];

  async findManyByUserId(id: string, page: number): Promise<CheckIn[]> {
    return this.items
      .filter((item) => item.user_id === id)
      .slice((page - 1) * 20, page * 20);
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const startOfTheday = dayjs(date).startOf("date");
    const endOfTheday = dayjs(date).endOf("date");

    const checkinONSameDate = this.items.find((checkin) => {
      const checkinDate = dayjs(checkin.created_at);
      const isOnSameDate =
        checkinDate.isAfter(startOfTheday) && checkinDate.isBefore(endOfTheday);
      return checkin.user_id === userId && isOnSameDate;
    });
    return checkinONSameDate ? checkinONSameDate : null;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkin = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    };

    this.items.push(checkin);
    return checkin;
  }
}

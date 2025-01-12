import { CheckIn, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { CheckInRepository } from "../check-in-repository";

export class inMemoryCheckinRepository implements CheckInRepository {
  public items: CheckIn[] = [];

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

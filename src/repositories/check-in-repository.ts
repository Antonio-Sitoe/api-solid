import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  save(data: Prisma.CheckInUncheckedCreateInput): Promise<void>;
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
  findManyByUserId(id: string, page: number): Promise<CheckIn[]>;
  countByUserId(userId: string): Promise<number>;
  findById(id: string): Promise<CheckIn | null>;
}

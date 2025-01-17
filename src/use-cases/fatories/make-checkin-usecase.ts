import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CheckInUseCase } from "../checkin";
import { PrismaCheckinsRepository } from "@/repositories/prisma/prisma-checkins-repository";

export function makeGetUserProfileUseCase() {
  const repository = new PrismaCheckinsRepository();
  const gymrepos = new PrismaGymRepository();
  const usecase = new CheckInUseCase(repository, gymrepos);
  return usecase;
}

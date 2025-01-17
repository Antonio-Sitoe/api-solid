import { GetUserMetricsUseCase } from "../get-user-metrics";
import { PrismaCheckinsRepository } from "@/repositories/prisma/prisma-checkins-repository";

export function makeGetUserProfileUseCase() {
  const repository = new PrismaCheckinsRepository();
  const usecase = new GetUserMetricsUseCase(repository);
  return usecase;
}

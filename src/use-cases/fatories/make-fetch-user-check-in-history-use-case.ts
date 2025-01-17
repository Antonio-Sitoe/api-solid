import { fecthNumberCheckInHistoryUseCase } from "../fecth-number-check-in-history";
import { PrismaCheckinsRepository } from "@/repositories/prisma/prisma-checkins-repository";

export function mekeFetchUserCheckinsHistoryUseCase() {
  const repository = new PrismaCheckinsRepository();
  const usecase = new fecthNumberCheckInHistoryUseCase(repository);
  return usecase;
}

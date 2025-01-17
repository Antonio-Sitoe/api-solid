import { PrismaCheckinsRepository } from "@/repositories/prisma/prisma-checkins-repository";
import { ValidateCheckInUseCase } from "../validate-check-in";

export function makeValidateCheckinUseCase() {
  const repository = new PrismaCheckinsRepository();
  const usecase = new ValidateCheckInUseCase(repository);
  return usecase;
}

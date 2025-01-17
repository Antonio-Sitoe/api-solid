import { SearchGymUseCase } from "../search-gym";
import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeValidateCheckinUseCase() {
  const repository = new PrismaGymRepository();
  const usecase = new SearchGymUseCase(repository);
  return usecase;
}

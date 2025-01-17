import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CreateGymUseCase } from "../create-gym";

export function makeCreateGymUseCase() {
  const repository = new PrismaGymRepository();
  const usecase = new CreateGymUseCase(repository);
  return usecase;
}

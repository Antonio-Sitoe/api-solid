import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "../register";

export function makeRegisterUseCase() {
  const userRepository = new PrismaUsersRepository();
  const registerRepository = new RegisterUseCase(userRepository);
  return registerRepository;
}

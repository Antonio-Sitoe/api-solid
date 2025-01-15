import { hash } from "bcryptjs";
import { IRegisterUseCase } from "@/zod/user-schema";
import { IUsersRepository } from "@/repositories/users-repository";
import { UserAlreadyExistsError } from "./erros/user-already-exists";
import { User } from "@prisma/client";

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: IRegisterUseCase): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 2);
    const userWithThisEmail = await this.userRepository.findByEmail(email);
    if (userWithThisEmail) {
      throw new UserAlreadyExistsError();
    }
    const user = await this.userRepository.create({
      email,
      name,
      password_hash,
    });
    return { user };
  }
}

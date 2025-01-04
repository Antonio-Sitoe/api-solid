import { hash } from "bcryptjs";
import { IRegisterUseCase } from "@/zod/user-schema";
import { IUsersRepository } from "@/repositories/users-repository";
import { UserAlreadyExistsError } from "./erros/user-already-exists";

export class RegisterUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute({ email, name, password }: IRegisterUseCase) {
    const password_hash = await hash(password, 2);
    const userWithThisEmail = await this.userRepository.findByEmail(email);
    if (userWithThisEmail) {
      throw new UserAlreadyExistsError();
    }
    await this.userRepository.create({
      email,
      name,
      password_hash,
    });
  }
}

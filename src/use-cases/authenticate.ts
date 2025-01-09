import { IUsersRepository } from "@/repositories/users-repository";
import { InvalidCredencialError } from "./erros/invalid-credencials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new InvalidCredencialError();

    const does_password_matches = await compare(password, user.password_hash);

    if (!does_password_matches) throw new InvalidCredencialError();

    return {
      user,
    };
  }
}

import { IUsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { resourceNOtFoundError } from "./erros/resource-not-found";

interface GetUserProfileUseCaseRequest {
  userId: string;
}

interface GetUserProfileUseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.userRepository.findByEmail(userId);

    if (!user) throw new resourceNOtFoundError();

    return {
      user,
    };
  }
}

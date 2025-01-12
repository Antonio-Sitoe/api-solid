import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/check-in-repository";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
}

interface CheckInUseCaseResponse {
  checkin: CheckIn;
}

export class CheckInUseCase {
  constructor(private checkinRepository: CheckInRepository) {}

  async execute({
    gymId,
    userId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkin = await this.checkinRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return { checkin };
  }
}

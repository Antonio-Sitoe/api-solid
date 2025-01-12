import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/check-in-repository";
import { GymRepository } from "@/repositories/gym-repository";
import { resourceNOtFoundError } from "./erros/resource-not-found";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  latitude: number;
  longitude: number;
}

interface CheckInUseCaseResponse {
  checkin: CheckIn;
}

export class CheckInUseCase {
  constructor(
    private checkinRepository: CheckInRepository,
    private gymRepository: GymRepository,
  ) {}

  async execute({
    gymId,
    userId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymRepository.findById(gymId);

    if (!gym) {
      throw new resourceNOtFoundError();
    }

    const checkinOnSameDay = await this.checkinRepository.findByUserIdOnDate(
      userId,
      new Date(),
    );

    if (checkinOnSameDay) {
      throw new Error("Ja fez checkin");
    }

    const checkin = await this.checkinRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return { checkin };
  }
}

import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/check-in-repository";
import { GymRepository } from "@/repositories/gym-repository";
import { resourceNOtFoundError } from "./erros/resource-not-found";
import { getDistanceBetweenCoordinates } from "@/utlis/get-distance-between-coordinates";

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
    latitude,
    longitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymRepository.findById(gymId);

    if (!gym) {
      throw new resourceNOtFoundError();
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude, longitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    );

    const MAX_DISTANCE = 0.1;

    if (distance > MAX_DISTANCE) {
      throw new Error();
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

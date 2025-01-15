import { GymRepository } from "@/repositories/gym-repository";
import { Gym } from "@prisma/client";

interface CreateGymCaseRequest {
  title: string;
  description?: string | null;
  latitude: number;
  longitude: number;
  phone: string | null;
}

interface CreateGymUseCaseResponse {
  gym: Gym;
}

export class CreateGymUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    latitude,
    longitude,
    phone,
    title,
    description,
  }: CreateGymCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymRepository.create({
      latitude,
      longitude,
      title,
      phone,
      description,
    });

    return {
      gym,
    };
  }
}

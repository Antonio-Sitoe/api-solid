import { GymRepository } from "@/repositories/gym-repository";
import { Gym } from "@prisma/client";

interface SearchGymUseRequest {
  query: string;
  page: number;
}

interface SearchGymUseCaseResponse {
  gyms: Gym[];
}

export class SearchGymUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    query,
    page,
  }: SearchGymUseRequest): Promise<SearchGymUseCaseResponse> {
    const gyms = await this.gymRepository.searchMany(query, page);
    return { gyms };
  }
}

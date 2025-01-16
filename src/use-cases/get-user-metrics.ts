import { CheckInRepository } from "../repositories/check-in-repository";

interface GetUserMetricsUseCaseRequest {
  userId: string;
}

interface GetUserMetricsUseCaseResponse {
  checkinsCount: number;
}

export class GetUserMetricsUseCase {
  constructor(private checkinsRepository: CheckInRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkinsCount = await this.checkinsRepository.countByUserId(userId);
    return { checkinsCount };
  }
}

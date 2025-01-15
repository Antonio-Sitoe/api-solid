import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/check-in-repository";

interface fecthNumberCheckInHistoryUseCaseRequest {
  userId: string;
  page: number;
}

interface fecthNumberCheckInHistoryUseCaseResponse {
  checkins: CheckIn[];
}

export class fecthNumberCheckInHistoryUseCase {
  constructor(private checkinRepository: CheckInRepository) {}

  async execute({
    userId,
    page,
  }: fecthNumberCheckInHistoryUseCaseRequest): Promise<fecthNumberCheckInHistoryUseCaseResponse> {
    const checkins = await this.checkinRepository.findManyByUserId(
      userId,
      page,
    );
    return { checkins };
  }
}

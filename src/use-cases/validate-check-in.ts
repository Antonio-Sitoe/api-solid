import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/check-in-repository";
import { resourceNOtFoundError } from "./erros/resource-not-found";
import dayjs from "dayjs";
import { LateCheckinValidationError } from "./erros/late-checkin-validation-error";

interface ValidateCheckInUseCaseRequest {
  checkinId: string;
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(private checkinRepository: CheckInRepository) {}

  async execute({
    checkinId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkinRepository.findById(checkinId);

    if (!checkIn) {
      throw new resourceNOtFoundError();
    }
    const distanceInMinutesFromCheckinCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes",
    );

    if (distanceInMinutesFromCheckinCreation > 20) {
      throw new LateCheckinValidationError();
    }

    checkIn.validated_at = new Date();

    return { checkIn };
  }
}

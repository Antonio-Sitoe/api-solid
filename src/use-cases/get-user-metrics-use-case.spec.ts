import { beforeEach, describe, expect, it } from "vitest";
import { inMemoryCheckinRepository } from "@/repositories/in-memory/in-memory-checkin-repository";

import { GetUserMetricsUseCase } from "./get-user-metrics";

let inMemoryRepository: inMemoryCheckinRepository;
let sut: GetUserMetricsUseCase;

describe("GET USER METRICS USE CASE", () => {
  beforeEach(() => {
    inMemoryRepository = new inMemoryCheckinRepository();
    sut = new GetUserMetricsUseCase(inMemoryRepository);
  });

  it("shold be able get check-ins count from metrics", async () => {
    await inMemoryRepository.create({
      gym_id: "1",
      user_id: "1",
    });
    await inMemoryRepository.create({
      gym_id: "2",
      user_id: "1",
    });

    const { checkinsCount } = await sut.execute({
      userId: "1",
    });

    expect(checkinsCount).toEqual(2);
  });
});

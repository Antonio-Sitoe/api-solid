import { beforeEach, describe, expect, it } from "vitest";
import { inMemoryCheckinRepository } from "@/repositories/in-memory/in-memory-checkin-repository";
import { CheckInUseCase } from "./checkin";

let inMemoryRepository: inMemoryCheckinRepository;
let sut: CheckInUseCase;

describe("CHECKIN: TESTS", () => {
  beforeEach(() => {
    inMemoryRepository = new inMemoryCheckinRepository();
    sut = new CheckInUseCase(inMemoryRepository);
  });

  it("shold be able to checkin", async () => {
    const { checkin } = await sut.execute({
      gymId: "123",
      userId: "123",
    });
    expect(checkin.id).toEqual(expect.any(String));
  });
});

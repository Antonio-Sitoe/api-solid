import { beforeEach, describe, expect, it } from "vitest";
import { inMemoryCheckinRepository } from "@/repositories/in-memory/in-memory-checkin-repository";

import { fecthNumberCheckInHistoryUseCase } from "./fecth-number-check-in-history";

let inMemoryRepository: inMemoryCheckinRepository;
let sut: fecthNumberCheckInHistoryUseCase;

describe("FETCH CHECKIN HISTORYS", () => {
  beforeEach(() => {
    inMemoryRepository = new inMemoryCheckinRepository();
    sut = new fecthNumberCheckInHistoryUseCase(inMemoryRepository);
  });

  it("shold be able fecth user checkin", async () => {
    await inMemoryRepository.create({
      gym_id: "1",
      user_id: "1",
    });
    await inMemoryRepository.create({
      gym_id: "2",
      user_id: "1",
      created_at: new Date(),
    });

    const { checkins } = await sut.execute({
      userId: "1",
      page: 1,
    });

    expect(checkins).toHaveLength(2);
    expect(checkins).toEqual([
      expect.objectContaining({ gym_id: "1" }),
      expect.objectContaining({ gym_id: "2" }),
    ]);
  });

  it("shold be able fecth paginated history", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryRepository.create({
        gym_id: `${i}`,
        user_id: "1",
      });
    }

    const { checkins } = await sut.execute({
      userId: "1",
      page: 2,
    });
    expect(checkins).toHaveLength(2);
    expect(checkins).toEqual([
      expect.objectContaining({ gym_id: "21" }),
      expect.objectContaining({ gym_id: "22" }),
    ]);
  });
});

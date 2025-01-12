import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { inMemoryCheckinRepository } from "@/repositories/in-memory/in-memory-checkin-repository";
import { CheckInUseCase } from "./checkin";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { Decimal } from "@prisma/client/runtime/library";

let inMemoryRepository: inMemoryCheckinRepository;
let gymrepository: InMemoryGymRepository;
let sut: CheckInUseCase;

describe("CHECKIN: TESTS", () => {
  beforeEach(() => {
    inMemoryRepository = new inMemoryCheckinRepository();
    gymrepository = new InMemoryGymRepository();
    sut = new CheckInUseCase(inMemoryRepository, gymrepository);
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it("shold be able to checkin", async () => {
    await gymrepository.items.push({
      id: "123",
      description: "asa",
      latitude: new Decimal(0),
      longitude: new Decimal(0),
      title: "dsds",
      phone: "23443443434",
      created_at: new Date(),
      updated_at: new Date(),
    });
    const { checkin } = await sut.execute({
      gymId: "123",
      userId: "123",
      latitude: 0,
      longitude: 0,
    });
    expect(checkin.id).toEqual(expect.any(String));
  });
  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "123",
      userId: "123",
      latitude: 0,
      longitude: 0,
    });

    await expect(() => {
      return sut.execute({
        gymId: "123",
        userId: "123",
        latitude: 0,
        longitude: 0,
      });
    }).rejects.toBeInstanceOf(Error);
  });
  it("should not be able to check in twice in diferent day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "123",
      userId: "123",
      latitude: 0,
      longitude: 0,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    await expect(() => {
      return sut.execute({
        gymId: "123",
        userId: "123",
        latitude: 0,
        longitude: 0,
      });
    }).rejects.toBeInstanceOf(Error);
  });
});

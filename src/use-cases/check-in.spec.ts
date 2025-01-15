import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { inMemoryCheckinRepository } from "@/repositories/in-memory/in-memory-checkin-repository";
import { CheckInUseCase } from "./checkin";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxDistanceError } from "./erros/max-distance-error";

let inMemoryRepository: inMemoryCheckinRepository;
let gymrepository: InMemoryGymRepository;
let sut: CheckInUseCase;

describe("CHECKIN: TESTS", () => {
  beforeEach(() => {
    inMemoryRepository = new inMemoryCheckinRepository();
    gymrepository = new InMemoryGymRepository();
    sut = new CheckInUseCase(inMemoryRepository, gymrepository);

    gymrepository.items.push({
      id: "gym-01",
      title: "Javascript GYm",
      description: "Gym",
      created_at: new Date(),
      latitude: new Decimal(-27.92052),
      longitude: new Decimal(-49.6401091),
      phone: "",
      updated_at: new Date(),
    });
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

  it("shold not be able to checkin in distance gym", async () => {
    gymrepository.items.push({
      id: "gym-02",
      title: "Javascrip",
      description: "Gym",
      created_at: new Date(),
      latitude: new Decimal(-27.07454456),
      longitude: new Decimal(-49.3354543),
      phone: "",
      updated_at: new Date(),
    });

    expect(() =>
      sut.execute({
        gymId: "gym-02",
        userId: "user-1",
        latitude: -27.92052,
        longitude: -49.6401091,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});

import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateGymUseCase } from "./create-gym";

let gymrepository: InMemoryGymRepository;
let sut: CreateGymUseCase;

describe("CREATE GYM USE CASE", () => {
  beforeEach(async () => {
    gymrepository = new InMemoryGymRepository();
    sut = new CreateGymUseCase(gymrepository);
  });

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "Javascript GYm",
      description: "Gym",
      latitude: -27.92052,
      longitude: -49.6401091,
      phone: null,
    });

    expect(gym.id);
  });
});

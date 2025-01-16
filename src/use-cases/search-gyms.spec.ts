import { beforeEach, describe, expect, it } from "vitest";

import { SearchGymUseCase } from "./search-gym";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";

let inMemoryRepository: InMemoryGymRepository;
let sut: SearchGymUseCase;

describe("Search gym usecase", () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryGymRepository();
    sut = new SearchGymUseCase(inMemoryRepository);
  });

  it("should be able to search for gyms", async () => {
    await inMemoryRepository.create({
      title: "Javascript Gym",
      latitude: 0,
      longitude: 0,
    });
    await inMemoryRepository.create({
      title: "Kotlin Gym",
      latitude: 0,
      longitude: 0,
    });

    const { gyms } = await sut.execute({
      query: "Javascript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Javascript Gym" }),
    ]);
  });
});

import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-user-repository";
import { hash } from "bcryptjs";
import { GetUserProfileUseCase } from "./get-user-profile";
import { resourceNOtFoundError } from "./erros/resource-not-found";

let inMemoryRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("GET USER PROFILE", () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(inMemoryRepository);
  });

  it("shold be able to authenticate", async () => {
    const userCreated = await inMemoryRepository.create({
      email: "antonio@gmail.com",
      name: "antonio",
      password_hash: await hash("1234", 6),
    });
    const { user } = await sut.execute({
      userId: userCreated.id,
    });
    expect(user.id).toEqual(expect.any(String));
  });
  it("SHOLD NOT BE ABLE TO GET PROFILE WITH WRONG ID", async () => {
    expect(() => {
      sut.execute({
        userId: "ew",
      });
    }).toBeInstanceOf(resourceNOtFoundError);
  });
});

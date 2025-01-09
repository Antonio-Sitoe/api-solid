import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-user-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";

describe("teste if authentication works", () => {
  it("shold be able to authenticate", async () => {
    const inMemoryRepository = new InMemoryUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(inMemoryRepository);

    await inMemoryRepository.create({
      email: "antonio@gmail.com",
      name: "antonio",
      password_hash: await hash("1234", 6),
    });

    const { user } = await authenticateUseCase.execute({
      email: "antonio@gmail.com",
      password: "1234",
    });
    expect(user.id).toEqual(expect.any(String));
  });
});

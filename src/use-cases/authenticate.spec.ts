import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-user-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredencialError } from "./erros/invalid-credencials-error";

let inMemoryRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("teste if authentication works", () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(inMemoryRepository);
  });

  it("shold be able to authenticate", async () => {
    await inMemoryRepository.create({
      email: "antonio@gmail.com",
      name: "antonio",
      password_hash: await hash("1234", 6),
    });
    const { user } = await sut.execute({
      email: "antonio@gmail.com",
      password: "1234",
    });
    expect(user.id).toEqual(expect.any(String));
  });
  it("should not be able to authenticate with wrong email", async () => {
    await expect(
      sut.execute({
        email: "antonio@gmail.com",
        password: "1234",
      }),
    ).rejects.toBeInstanceOf(InvalidCredencialError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const inMemoryRepository: InMemoryUsersRepository =
      new InMemoryUsersRepository();

    await inMemoryRepository.create({
      email: "antonio@gmail.com",
      name: "antonio",
      password_hash: await hash("1234", 6),
    });

    await expect(
      sut.execute({
        email: "antonio@gmail.com",
        password: "12345",
      }),
    ).rejects.toBeInstanceOf(InvalidCredencialError);
  });
});

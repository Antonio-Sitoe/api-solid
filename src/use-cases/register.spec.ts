import { compare } from "bcryptjs";
import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { RegisterUseCase } from "./register";
import { UserAlreadyExistsError } from "./erros/user-already-exists";

describe("Register Use case", () => {
  it("shold be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      email: "toni@gmail.com",
      name: "Antonio Sitoe",
      password: "1234",
    });

    expect(user.id).toEqual(expect.any(String));
  });
  it("Should hash user password upon registration", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      email: "toni@gmail.com",
      name: "Antonio Sitoe",
      password: "1234",
    });
    const isPasswordCorrectlyHashed = await compare("1234", user.password_hash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
  it("Should be not enable to register with same email twice", async () => {
    const email = "tony@gmail.com";
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);
    await registerUseCase.execute({
      email: email,
      name: "Antonio Sitoe",
      password: "1234",
    });
    await expect(() =>
      registerUseCase.execute({
        email: email,
        name: "Maria Sitoe",
        password: "1234",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});

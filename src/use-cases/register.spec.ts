import { compare } from "bcryptjs";
import { describe, it } from "vitest";
import { RegisterUseCase } from "./register";

describe("Register Use case", () => {
  it("Should hash user password upon registration", async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail() {
        return null;
      },
      async create(data) {
        return {
          id: "123",
          created_at: new Date(),
          email: data.email || "toni@gmail.com",
          name: data.name || "Antonio Sitoe",
          password_hash: data.password_hash || "123456",
        };
      },
    });

    const { user } = await registerUseCase.execute({
      email: "toni@gmail.com",
      name: "Antonio Sitoe",
      password: "1234",
    });
    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash,
    );
    console.log({ isPasswordCorrectlyHashed });
  });
});

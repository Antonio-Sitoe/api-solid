import { Prisma, User } from "@prisma/client";
import { IUsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements IUsersRepository {
  public items: User[] = [];
  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: "123",
      created_at: new Date(),
      email: data.email || "toni@gmail.com",
      name: data.name || "Antonio Sitoe",
      password_hash: data.password_hash || "123456",
    };

    this.items.push(user);
    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);
    return user ? user : null;
  }
}

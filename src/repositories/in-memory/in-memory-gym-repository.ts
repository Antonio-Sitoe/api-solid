import { Gym, Prisma } from "@prisma/client";
import { GymRepository } from "../gym-repository";

export class InMemoryGymRepository implements GymRepository {
  public items: Gym[] = [];

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id);
    return gym ? gym : null;
  }
  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const newGym: Gym = {
      id: data.id ? data.id : crypto.randomUUID(),
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      title: data.title,
      phone: data.phone ?? null,
      description: data.description ?? null,
      updated_at: new Date(),
      created_at: new Date(),
    };

    this.items.push(newGym);
    return newGym;
  }
}

import { user_schema } from "@/zod/user-schema";
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExistsError } from "@/use-cases/erros/user-already-exists";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { email, name, password } = user_schema.parse(request.body);
  try {
    const userRepository = new PrismaUsersRepository();
    const registerRepository = new RegisterUseCase(userRepository);
    await registerRepository.execute({ email, name, password });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ error: error.message });
    }
    throw error;
  }
  return reply.status(201).send();
}

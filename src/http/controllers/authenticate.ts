import { UserAlreadyExistsError } from "@/use-cases/erros/user-already-exists";
import { makeAuthenticateUseCase } from "@/use-cases/fatories/make-authenticate-use-case";
import { authenticate_user_schema } from "@/zod/user-schema";
import { FastifyReply, FastifyRequest } from "fastify";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email, password } = authenticate_user_schema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();
    await authenticateUseCase.execute({ email, password });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(400).send({ error: error.message });
    }
    throw error;
  }
  return reply.status(201).send();
}

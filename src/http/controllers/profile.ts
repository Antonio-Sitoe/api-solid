import { makeGetUserProfileUseCase } from "@/use-cases/fatories/make-get-user-profile-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify();
  const userId = request.user.sub;
  const getUserProfile = makeGetUserProfileUseCase();
  const { user } = await getUserProfile.execute({
    userId: userId,
  });
  const { password_hash = "", ...props } = user;
  console.log("password_hash", password_hash);
  return reply.status(201).send({ user: { ...props } });
}

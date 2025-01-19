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
    const { user } = await authenticateUseCase.execute({ email, password });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    );

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: "7d",
        },
      },
    );

    const { password_hash, ...props } = user;
    console.log({ password_hash });

    return reply
      .setCookie("refresh-token", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
        user: { ...props },
      });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(400).send({ error: error.message });
    }
    throw error;
  }
}

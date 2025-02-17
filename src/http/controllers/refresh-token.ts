import { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true });
  const userId = request.user.sub;

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: userId,
      },
    },
  );

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: userId,
        expiresIn: "7d",
      },
    },
  );

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
    });
}

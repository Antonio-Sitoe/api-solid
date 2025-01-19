import { FastifyInstance } from "fastify";
import { authenticate } from "./controllers/authenticate";
import { verifyJWT } from "./middlewares/verify-jwt";
import { register } from "./controllers/register";
import { profile } from "./controllers/profile";
import { refresh } from "./controllers/refresh-token";

export function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  // Authenticated
  app.patch("/token/refresh", refresh);
  app.get(
    "/me",
    {
      onRequest: [verifyJWT],
    },
    profile,
  );
}

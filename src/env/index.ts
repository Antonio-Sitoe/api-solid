import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("INVALID ENVIRONMENT VARIABLES", _env.error.format());
  throw new Error("INVALID ENVIRONMENT VARIABLES");
}

export const env = _env.data;

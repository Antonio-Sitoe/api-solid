import { z } from "zod";

export const user_schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export const authenticate_user_schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type IRegisterUseCase = z.infer<typeof user_schema>;
export type IauthenticateUseCase = z.infer<typeof authenticate_user_schema>;

import { z } from "zod";

export const signupPostRequestBodySchema = z.object({
  firstname: z.string(),
  lastname: z.string().optional(),
  email: z.string().email(),
  firstname: z.string().min(4),
});

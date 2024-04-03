import { z } from "zod";

const loginValidation = z.object({
  email: z.string({ required_error: "email is required" }),
  password: z.string({ required_error: "Password is required" }),
});

export const AuthValidation = {
  loginValidation,
};

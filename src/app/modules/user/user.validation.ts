import { z } from "zod";

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: "password must be string",
    })
    .max(20, { message: "password cannot be more then 20 characters" })
    .optional(),
  email: z.string({
    invalid_type_error: "email must be string",
  }),
});

export const UserValidation = {
  userValidationSchema,
};

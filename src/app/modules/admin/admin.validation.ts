import { z } from "zod";

const nameSchema = z.object({
  firstName: z.string({
    invalid_type_error: "first name must be a string",
    required_error: "first name is required",
  }),
  lastName: z.string({
    invalid_type_error: "last name must be a string",
    required_error: "last name is required",
  }),
});

const adminValidation = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      id: z.string(), // Assuming id is always a string
      name: nameSchema,
      gender: z.enum(["male", "female"]),
      dateOfBirth: z.string({
        invalid_type_error: "date  must be a string",
        required_error: "date  is required",
      }), // You might want to use a more specific type for date
      email: z
        .string({
          invalid_type_error: "email must be a string",
          required_error: "email  is required",
        })
        .email(),
      contactNumber: z.string({
        invalid_type_error: "contact number must be a string",
        required_error: "contact number  is required",
      }), // You might want to add more validation for phone number format
      address: z.string({
        invalid_type_error: "address must be a string",
        required_error: "address is required",
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

export const AdminValidationSchema = {
  adminValidation,
};

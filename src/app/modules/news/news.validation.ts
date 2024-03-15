import { z } from "zod";

const NewsValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "title is required",
      invalid_type_error: "title is must be string",
    }),
    description: z.string({
      required_error: "description is required",
      invalid_type_error: "description is must be string",
    }),

    date: z.string({
      required_error: "date is required",
      invalid_type_error: "date is must be string",
    }),
  }),
});

const NewsUpdatedValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "title is required",
        invalid_type_error: "title is must be string",
      })
      .optional(),
    description: z
      .string({
        required_error: "description is required",
        invalid_type_error: "description is must be string",
      })
      .optional(),

    date: z
      .string({
        required_error: "date is required",
        invalid_type_error: "date is must be string",
      })
      .optional(),
  }),
});

export const NewsValidations = {
  NewsValidationSchema,
  NewsUpdatedValidationSchema,
};

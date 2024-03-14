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

export const NewsValidations = {
  NewsValidationSchema,
};

import * as z from "zod";

export const CreateCourseSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.optional(z.string()),
  image: z.optional(z.string()),
  price: z.optional(z.coerce.number()),
  isPublished: z.optional(z.coerce.boolean()),
  categoryId: z.optional(z.string()),
});

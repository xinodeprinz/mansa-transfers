import z from "zod";

export const createProductSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters.").max(80),

  image: z
    .custom<File>((v) => v instanceof File, {
      message: "Product image is required.",
    })
    .refine((f) => f.size <= 5 * 1024 * 1024, "Max size is 5MB.")
    .refine(
      (f) => ["image/png", "image/jpeg", "image/webp"].includes(f.type),
      "Only PNG, JPG or WEBP allowed.",
    ),

  description: z
    .string()
    .max(500, "Description is too long.")
    .optional()
    .transform((v) => (v?.trim() ? v.trim() : undefined)),

  price: z.preprocess(
    (v) => (v === "" || v === null || v === undefined ? undefined : Number(v)),
    z
      .number({ error: "Price is required." })
      .finite("Invalid price.")
      .positive("Price must be greater than 0."),
  ),

  quantity: z.preprocess(
    (v) => (v === "" || v === null || v === undefined ? undefined : Number(v)),
    z
      .number()
      .int("Quantity must be an integer.")
      .min(0, "Quantity cannot be negative.")
      .optional(),
  ),
});

export type CreateProductForm = z.infer<typeof createProductSchema>;

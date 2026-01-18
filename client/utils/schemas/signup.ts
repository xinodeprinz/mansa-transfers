import z from "zod";
import { isMtnOrOrangeCameroon, normalizeCameroonPhone } from "@/utils";

export const signUpSchema = z.object({
  first_name: z
    .string("The first name is required.")
    .min(2, "First name must be at least 2 characters.")
    .max(50)
    .trim(),
  last_name: z
    .string("The last name is required.")
    .min(2, "Last name must be at least 2 characters.")
    .max(50)
    .trim(),
  email: z.email("Please enter a valid email address.").trim(),
  phone: z
    .string("The phone number is required.")
    .min(8, "Please enter a valid phone number.")
    .transform((v) => v.trim())
    .refine((v) => {
      const local = normalizeCameroonPhone(v);
      return isMtnOrOrangeCameroon(local);
    }, "Phone must be a valid Cameroon MTN or Orange number."),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters.")
    .max(72, "Password is too long."),
});

export type SignUpForm = z.infer<typeof signUpSchema>;

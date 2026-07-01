import { z } from "zod";

const validTemplateIds = [
  "classic-romance",
  "modern-love",
  "vintage-charm",
] as const;

export const letterSchema = z.object({
  recipientName: z
    .string()
    .min(2, "Recipient name must be at least 2 characters long")
    .max(100, "Recipient name must be under 100 characters"),
  content: z
    .string()
    .min(1, "Your letter cannot be empty — write something from the heart")
    .max(50000, "Your letter is too long (max 50,000 characters)"),
  templateId: z.enum(validTemplateIds).optional(),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters long")
    .max(128, "Password must be under 128 characters")
    .optional()
    .or(z.literal("")),
});

export type LetterInput = z.infer<typeof letterSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must be under 100 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(128, "Password must be under 128 characters"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

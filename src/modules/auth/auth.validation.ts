import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least three characters long")
    .max(100, "Name must not exceed 100 characters"),

  email: z.email("Invalid email provided"),

  password: z
    .string()
    .trim()
    .min(6, "Password should be at least 6 characters long")
    .max(70, "Password can not be longer than 70 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter A-Z")
    .regex(/[a-z]/, "Password must contain at least one lower letter a-z")
    .regex(/[0-9]/, "Password must contain at least one number character 0-9"),
});

export const loginSchema = z.object({
  email: z.email("Invalid email Provided"),
  password: z.string().min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

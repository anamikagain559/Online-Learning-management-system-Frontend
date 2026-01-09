/* eslint-disable @typescript-eslint/no-explicit-any */
import z from "zod";

// ------------------- Register User Validation -------------------
export const registerUserValidationZodSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    address: z.string().max(200, { message: "Address cannot exceed 200 characters" }).optional(),
    email: z.string().email({ message: "Valid email is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(100, { message: "Password must be at most 100 characters long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm Password must be at least 6 characters long" })
      .max(100, { message: "Confirm Password must be at most 100 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // attach error to confirmPassword field
  });

// ------------------- Login Validation -------------------
export const loginValidationZodSchema = z.object({
  email: z.string().email({ message: "Valid email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(100, { message: "Password must be at most 100 characters long" }),
});

// ------------------- Reset Password Validation -------------------
export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(100, { message: "Password must be at most 100 characters long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(100, { message: "Password must be at most 100 characters long" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // attach error to confirmPassword field
  });

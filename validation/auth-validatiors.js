const { z } = require("zod");
const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required!" })
    .trim()
    .min(1, { message: "Email is required!" })
    .email({ message: "Inavlid email address!" }),
  password: z
    .string({ required_error: "Password is required!" })
    .trim()
    .min(1, { message: "Password is required!" }),
});

const registerSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required!" })
      .trim()
      .min(3, { message: "Name must not be less than 3 characters!" })
      .max(255, { message: "Name must not be more than 50 characters!" }),
    email: z
      .string({ required_error: "Email is required!" })
      .trim()
      .min(1, { message: "Email is required!" })
      .email({ message: "Inavlid email address!" })
      .max(255, { message: "Email must must not exceed 255 characters!" }),
    password: z
      .string({ required_error: "Password is required!" })
      .trim()
      .min(6, { message: "Password must not be less than 6 characters!" })
      .max(255, { message: "Password must not exceed 255 characters!" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password must match!",
    path: ["confirmPassword"],
  });

module.exports = { loginSchema, registerSchema };

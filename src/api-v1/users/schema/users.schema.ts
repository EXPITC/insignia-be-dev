import { z } from 'zod';

export const updateUserSchema = z.object({
  data: z.object({
    email: z.string().email().min(1, 'Email is required').optional(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .optional(),
    name: z.string().optional(),
  }),
});

export const listUserSchema = z.object({
  search: z.string().optional(),
  pagination: z.object({
    take: z.number(),
    skip: z.number(),
  }),
});

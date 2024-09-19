import { UserRoleEnum } from '@prisma/client';
import { z } from 'zod';

const userRoleArray = Object.values(UserRoleEnum) as [
  'SUPER_ADMIN',
  'ADMIN_MANAGEMENT',
  'MANAGEMENT',
  'GUEST',
];

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const registerSchema = z.object({
  email: z.string().min(1, 'Email is required'),
  name: z.string().min(1, 'name is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  role: z.enum(userRoleArray),
});

import { z } from 'zod';

export const listContactSchema = z.object({
  search: z.string().optional(),
  pagination: z.object({
    take: z.number(),
    skip: z.number(),
  }),
});

export const contactSchema = z.object({
  workspaceId: z.string().optional(),
  name: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
  address: z.string(),
});

export const addContactSchema = z.object({
  data: contactSchema,
});

export const editContactSchema = z.object({
  id: z.string(),
  data: contactSchema.partial(),
});

export const deleteContactSchema = z.object({
  id: z.string().array(),
});

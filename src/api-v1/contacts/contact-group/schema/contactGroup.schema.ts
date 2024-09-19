import { z } from 'zod';

export const listContactGroupSchema = z.object({
  search: z.string().optional(),
  pagination: z.object({
    take: z.number(),
    skip: z.number(),
  }),
});

export const addContactGroupSchema = z.object({
  data: z.object({
    name: z.string(),
    description: z.string(),
    contactIds: z.string().array().optional(),
  }),
});

export const removeContactGroupSchema = z.object({
  ContactGroupId: z.string(),
});

export const addContactToGroupSchema = z.object({
  ContactGroupId: z.string(),
  contactIds: z.string().array(),
});

export const removeContactFromGroupSchema = z.object({
  ContactGroupId: z.string(),
  contactIds: z.string().array(),
});

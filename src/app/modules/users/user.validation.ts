import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6, 'Password must be 6 character or longer'),
    address: z.string(),
    phone: z.string(),
    role: z.enum(['user', 'admin']),
  }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6, 'Password must be 6 character or longer'),
  }),
});

export const userValidationSchema = {
  createUserValidationSchema,
  loginUserValidationSchema,
};

import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
  API_BASE_URL: z.string().min(1).url(),
  AUTH_REDIRECT_URL: z.string().min(1).url(),
  JWT_SECRET_KEY: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
  SENTRY_DNS: z.string().min(1),
  SEND_AUTH_LINK_EMAIL: z.string().transform((value) => value === 'true'),
});

const _env = envSchema.safeParse(process.env);

if(!_env.success) {
  console.log('Invalid environment variables ‼️', _env.error.format());

  throw new Error('Invalid environment variables');
}

export const env = _env.data;
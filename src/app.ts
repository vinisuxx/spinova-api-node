import { FastifyReply, FastifyRequest, fastify } from 'fastify';
import { ZodError } from 'zod';
import { env } from './env';
import cookies from '@fastify/cookie';
import jwt from '@fastify/jwt';
import cors from '@fastify/cors';
import { UnauthorizedError } from './services/errors/unauthorized-error';
import { usersRoutes } from './api/controllers/users/routes';
import { User } from '@prisma/client';

export const app = fastify();

app.register(usersRoutes);
app.register(cors, {
  credentials: true,
  allowedHeaders: ['content-type'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  origin: true
});
app.register(cookies);
app.register(jwt, {
  secret: env.JWT_SECRET_KEY
});
app.decorate('getCurrentUser', async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const cookie = request.cookies['@spinova:auth'];

    if (!cookie) {
      throw new UnauthorizedError();
    }

    return app.jwt.verify<User>(cookie);
  } catch (error) {
    reply.status(401).send({ message: 'Unauthorized.' });
  }
});
app.decorate('signOut', async (reply: FastifyReply) => {
  reply.clearCookie('@spinova:auth', {
    path: '/'
  });
});
app.setErrorHandler((error, _, reply ) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issue: error.format()
    });
  }
  
  if (env.NODE_ENV !== 'production') {
    console.log(error);
  } else {
    // TODO: Should log to Datadog / Sentry / Webhook
  }

  return reply.status(500).send({
    message: 'Internal server error'
  });
});

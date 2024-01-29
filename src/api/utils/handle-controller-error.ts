import * as sentry from '@sentry/node';
import { FastifyReply } from 'fastify';

export const handleControllerError = (error: unknown, reply: FastifyReply) => {
  if (error instanceof Error) {
    sentry.captureException(error);
    return reply.status(409).send({
      message: error.message
    });
  }
  throw error;
};
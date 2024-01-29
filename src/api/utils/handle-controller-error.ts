import { FastifyReply } from 'fastify';

export const handleControllerError = (error: unknown, reply: FastifyReply) => {
  if (error instanceof Error) {
    return reply.status(409).send({
      message: error.message
    });
  }
  throw error;
};
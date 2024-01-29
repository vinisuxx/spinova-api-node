import { handleControllerError } from '@/api/utils/handle-controller-error';
import { app } from '@/app';
import { FastifyReply, FastifyRequest } from 'fastify';

export const signOut = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    app.signOut(reply);
  } catch (error) {
    handleControllerError(error, reply);
  }
  
  return reply.status(201).send();
};

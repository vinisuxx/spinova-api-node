import { app } from '@/app';
import { FastifyReply, FastifyRequest } from 'fastify';

export const verifyJwt = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const cookie = request.cookies['@spinova:auth'];

    if (!cookie) {
      throw new Error();
    }

    app.jwt.verify(cookie);
       
  } catch (error) {
    reply.status(401).send({ message: 'Unauthorized.' }).code(1111);
  }
};
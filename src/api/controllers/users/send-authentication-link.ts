import { handleControllerError } from '@/api/utils/handle-controller-error';
import { makeCreateAuthenticateLinkService } from '@/services/factories/make-create-auth-link-service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const sendAuthenticationLink = async (request: FastifyRequest, reply: FastifyReply) => {
  const sendAuthenticationLinkSchema= z.object({
    email: z.string().email()
  });

  const body = sendAuthenticationLinkSchema.parse(request.body);

  try {
    const authenticateMagicLinkService = makeCreateAuthenticateLinkService();

    await authenticateMagicLinkService.execute(body.email);

  } catch (error) {
    handleControllerError(error, reply);
  }

  return reply.status(201).send();
};
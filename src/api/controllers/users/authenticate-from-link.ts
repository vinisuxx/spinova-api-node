import { handleControllerError } from '@/api/utils/handle-controller-error';
import { makeAuthenticateFromLinkService } from '@/services/factories/authenticate-from-link-service';
import { makeDeleteAuthenticateLinkService } from '@/services/factories/delete-auth-link-service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const authenticateFromLink = async (request: FastifyRequest, reply: FastifyReply) => {
  const authenticateFromLinkSchema = z.object({
    code: z.string(),
    redirect: z.string(),
  });

  const { code, redirect } = authenticateFromLinkSchema.parse(request.query);

  try {

    const authenticateFromLinkService = makeAuthenticateFromLinkService();

    const { userId, authLinkId } = await authenticateFromLinkService.execute(code);
  
    const token = await reply.jwtSign({ userId });

    reply.setCookie('@spinova:auth', token, {
      httpOnly: true,
      maxAge: 1 * 86400,
      sameSite: true,
      path: '/',
    });

    const deleteAuthenticateLinkService = makeDeleteAuthenticateLinkService();

    await deleteAuthenticateLinkService.execute(authLinkId);

    reply.redirect(redirect);

  } catch (error) {
    handleControllerError(error, reply);
  }

  return reply.status(201).send();
};
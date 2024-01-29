import { handleControllerError } from '@/api/utils/handle-controller-error';
import { app } from '@/app';
import { makeGetUserProfileService } from '@/services/factories/make-get-user-profile-service';
import { FastifyReply, FastifyRequest } from 'fastify';

export const profile = async (request: FastifyRequest, reply: FastifyReply) => {
  const { userId } = await app.getCurrentUser(request, reply);

  try {
    const getUserProfileService = makeGetUserProfileService();

    const user = await getUserProfileService.execute(userId);

    if (!user) {
      throw new Error('User not found.');
    }

    return reply.status(200).send(user);
  }
  catch (error) {
    handleControllerError(error, reply);
  }
};

import { ArtistsRepository } from '@/api/repositories/artists-repository';
import { handleControllerError } from '@/api/utils/handle-controller-error';
import { CreateArtistService } from '@/services/create-artist';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const createArtistSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
  });

  const body = createArtistSchema.parse(request.body);

  try {
    const prismaArtistsRepository = new ArtistsRepository();
    const createArtistService = new CreateArtistService(prismaArtistsRepository);

    await createArtistService.execute({
      name: body.name,
      description: body.description || ''
    });

  } catch (error) {
    handleControllerError(error, reply);
  }

  return reply.status(201).send();
};


import { PrismaArtistsRepository } from '../repositories/prisma/prisma-artists-repository';
import { CreateArtistService } from '@/services/create-artist';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const createArtist = async(request: FastifyRequest, reply: FastifyReply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
  });

  const body = registerBodySchema.parse(request.body);

  try {
    const prismaArtistsRepository = new PrismaArtistsRepository();
    const createArtistService = new CreateArtistService(prismaArtistsRepository);

    await createArtistService.execute({
      name: body.name,
      description: body.description || ''
    });

  } catch (error) {
    if (error instanceof Error) {
      return reply.status(409).send({
        message: error.message
      });
    }
    
    throw error;
  }

  return reply.status(201).send();
};
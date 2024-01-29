import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { IArtistsRepository } from './interfaces/artists-repository';

export class ArtistsRepository implements IArtistsRepository { 
  create = async (data: Prisma.ArtistCreateInput) => {
    const artist = await prisma.artist.create({ data });

    return artist;
  };
  findByName = async (name: string) => {
    const artist = await prisma.artist.findFirst({
      where: {
        name: name,
      }
    });

    return artist;
  };
}
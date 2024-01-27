import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { ArtistsRepository } from '../artists-repository';

export class PrismaArtistsRepository implements ArtistsRepository {
  async create(data: Prisma.ArtistCreateInput) {
    const artist = await prisma.artist.create({ data });

    return artist;
  }

  async findByName(name: string){
    const artist = await prisma.artist.findFirst({
      where: {
        name: name,
      }
    });

    return artist;
  }
}
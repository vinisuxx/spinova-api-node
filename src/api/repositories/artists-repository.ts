import { Artist, Prisma } from '@prisma/client';

export interface ArtistsRepository {
  create(data: Prisma.ArtistCreateInput): Promise<Artist>;
  findByName(name: string): Promise<Artist | null>;
}
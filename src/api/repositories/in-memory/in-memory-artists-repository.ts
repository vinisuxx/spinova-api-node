import { IArtistsRepository } from './../interfaces/artists-repository';
import { Artist, Prisma } from '@prisma/client';
 
export class InMemoryArtistsRepository implements IArtistsRepository {
  public artists: Artist[] = [];
  async create(data: Prisma.ArtistCreateInput) {
    const artist:Artist = {
      id: 'JSAIDUSA-12382',
      name: data.name,
      description: data.description || null,
      createdAt: new Date(),
      createdBy: data.createdBy,
      updatedAt: new Date(),
      albumId: null,
    };

    this.artists.push(artist);

    return artist;
  }

  async findByName(name: string) {
    const artist = this.artists.find((item) => item.name === name);

    return artist ?? null;
  }
}
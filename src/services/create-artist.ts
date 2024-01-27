import { ArtistsRepository } from '@/api/repositories/artists-repository';
import { ArtistAlreadyExists } from './errors/artist-already-exists';
import { Artist } from '@prisma/client';

interface CreateArtistPayloadRequest {
  name: string;
  description?: string;
}

interface CreateArtistServiceResponse {
  artist: Artist;
}

export class CreateArtistService {
  constructor(private artistsRepository: ArtistsRepository) {}

  async execute({
    name,
    description
  }: CreateArtistPayloadRequest): Promise<CreateArtistServiceResponse>  {

    const artistAlreadyExists = await this.artistsRepository.findByName(name);

    if (artistAlreadyExists) {
      throw new ArtistAlreadyExists();
    }

    const artist = await this.artistsRepository.create({
      name,
      description,
      createdBy: 'SYSTEM',
    });

    return {
      artist
    };
  }
}
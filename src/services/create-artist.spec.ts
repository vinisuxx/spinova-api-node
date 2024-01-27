import { InMemoryArtistsRepository } from './../api/repositories/in-memory/in-memory-artists-repository';
import { test, describe, expect } from 'vitest';
import { CreateArtistService } from './create-artist';
import { ArtistAlreadyExists } from './errors/artist-already-exists';

describe('Create artist service', () => {
  test('should be able to create artist', async() => {
    const inMemoryArtistsRepository = new InMemoryArtistsRepository();
    const createArtistService = new CreateArtistService(inMemoryArtistsRepository);

    const { artist } = await createArtistService.execute({
      name: 'Artist Test',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing...'
    });

    expect(artist.id).toEqual(expect.any(String));
  });

  test('shouldn\'t be able to create artist with same name'), async() => {
    const inMemoryArtistsRepository = new InMemoryArtistsRepository();
    const createArtistService = new CreateArtistService(inMemoryArtistsRepository);
    
    const artist = {
      name: 'ArtistTest',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing...'
    };

    await createArtistService.execute(artist);

    await expect(() => {
      createArtistService.execute(artist);
    }).rejects.toBeInstanceOf(ArtistAlreadyExists);
  };
});
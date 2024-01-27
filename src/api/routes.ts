import { FastifyInstance } from 'fastify';
import { createArtist } from './controllers/artist-controller';

export const appRoutes = async(app: FastifyInstance) => {
  app.post('/artists', createArtist);
};
import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/api/middlewares/verify-jwt';
import { create } from './create';
export const usersRoutes = async (app: FastifyInstance) => {
  
  // Authenticated routes
  app.post('/artists', { onRequest: [verifyJwt] }, create);
};
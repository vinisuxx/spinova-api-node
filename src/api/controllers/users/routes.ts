import { FastifyInstance } from 'fastify';
import { profile } from './profile';
import { sendAuthenticationLink } from './send-authentication-link';
import { authenticateFromLink } from './authenticate-from-link';
import { signOut } from './sign-out';
import { verifyJwt } from '@/api/middlewares/verify-jwt';
export const usersRoutes = async (app: FastifyInstance) => {
  // Public routes
  app.post('/send-auth-link', sendAuthenticationLink);
  app.get('/auth-links/authenticate', authenticateFromLink);

  // Authenticated routes
  app.get('/me', { onRequest: [verifyJwt] }, profile);
  app.get('/sign-out', { onRequest: [verifyJwt] }, signOut );
};
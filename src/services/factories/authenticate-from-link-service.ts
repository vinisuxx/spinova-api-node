import { UsersRepository } from '@/api/repositories/users-repository.ts';
import { AuthenticateFromLinkService } from '../authenticate-from-link';

export const makeAuthenticateFromLinkService = () => {
  const userRepository = new UsersRepository();
  const service = new AuthenticateFromLinkService(userRepository);

  return service;
};

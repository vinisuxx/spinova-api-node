import { UsersRepository } from '@/api/repositories/users-repository.ts';
import { CreateAuthenticateLinkService } from '../create-auth-link';

export const makeCreateAuthenticateLinkService = () => {
  const userRepository = new UsersRepository();
  const service = new CreateAuthenticateLinkService(userRepository);

  return service;
};

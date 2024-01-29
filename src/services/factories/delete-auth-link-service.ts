import { UsersRepository } from '@/api/repositories/users-repository.ts';
import { DeleteAuthenticateLinkService } from '../delete-auth-link';

export const makeDeleteAuthenticateLinkService = () => {
  const userRepository = new UsersRepository();
  const service = new DeleteAuthenticateLinkService(userRepository);

  return service;
};

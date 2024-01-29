import { UsersRepository } from '@/api/repositories/users-repository.ts';

export class DeleteAuthenticateLinkService {
  constructor(private userRepository: UsersRepository) {}

  async execute(id: string): Promise<void>  {
    await this.userRepository.deleteAuthLink(id);
  }
}
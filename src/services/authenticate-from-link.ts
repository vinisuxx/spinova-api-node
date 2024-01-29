import { UsersRepository } from '@/api/repositories/users-repository.ts';
import { UnauthorizedError } from './errors/unauthorized-error';
import dayjs from 'dayjs';

interface AuthenticateFromLinkServieResponse {
  userId: string;
  authLinkId: string;
}

export class AuthenticateFromLinkService {
  constructor(private userRepository: UsersRepository) {}

  async execute(code: string): Promise<AuthenticateFromLinkServieResponse>  {

    const authLink = await this.userRepository.findAuthLink(code);
        
    if (!authLink) {
      throw new UnauthorizedError();
    }
    
    if (dayjs().diff(authLink.createdAt, 'minutes') > 10) {
      throw new Error('Expired token');
    }

    const user = await this.userRepository.findById(authLink.userId);

    if (!user) {
      throw new UnauthorizedError();
    }

    return {
      userId: user.id,
      authLinkId: authLink.id
    };
  }
}
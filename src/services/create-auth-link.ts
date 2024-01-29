import { UsersRepository } from '@/api/repositories/users-repository.ts';
import { UnauthorizedError } from './errors/unauthorized-error';
import { env } from '@/env';
import { createId } from '@paralleldrive/cuid2';
import { resend } from '@/mail/client';
import { AuthLinkEmailTemplate } from '@/mail/templates/auth-link';

export class CreateAuthenticateLinkService {
  constructor(private userRepository: UsersRepository) {}

  async execute(email: string): Promise<void>  {

    const userFromEmail = await this.userRepository.findByEmail(email);
    
    if (!userFromEmail) {
      throw new UnauthorizedError();
    }

    const authLinkCode = createId();

    await this.userRepository.insertAuthLink(userFromEmail.id, authLinkCode);

    const authLink = new URL('/auth-links/authenticate', env.API_BASE_URL);
    authLink.searchParams.set('code', authLinkCode);
    authLink.searchParams.set('redirect', env.AUTH_REDIRECT_URL);

    console.log(authLink.toString());

    if (env.SEND_AUTH_LINK_EMAIL) {
      await resend.emails.send({
        from: 'Spinova <noreply@spinova.store>',
        to: userFromEmail.email,
        subject: '[Spinova] Auth magic link',
        react: AuthLinkEmailTemplate(authLink.toString())
      });
    }
  }
}
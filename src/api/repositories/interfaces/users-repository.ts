import { AuthLink, User } from '@prisma/client';

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(userId: string): Promise<User | null>;
  insertAuthLink(email: string, code: string): Promise<void>;
  findAuthLink(code: string): Promise<AuthLink | null>;
  deleteAuthLink(id: string): Promise<void>;
  getUserProfile(userId: string): Promise<User | null>;
}
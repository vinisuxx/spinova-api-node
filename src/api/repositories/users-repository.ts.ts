import { prisma } from '@/lib/prisma';
import { IUsersRepository } from './interfaces/users-repository';

export class UsersRepository implements IUsersRepository {
  findByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      }
    });

    return user;
  };
  insertAuthLink = async (userId: string, code: string) =>{
    await prisma.authLink.create({
      data: {
        userId,
        code
      }
    }); 
  };
  findAuthLink = async (code: string) => {
    const authLink = await prisma.authLink.findFirst({
      where: {
        code: code,
      }
    });

    return authLink ?? null;
  };
  findById = async (id: string) => {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
      }
    });

    return user ?? null;
  };
  deleteAuthLink = async (id: string) => {
    await prisma.authLink.delete({
      where: {
        id: id,
      }
    });
  };
  getUserProfile = async (userId: string) => {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      }
    });

    return user ?? null;
  };
}
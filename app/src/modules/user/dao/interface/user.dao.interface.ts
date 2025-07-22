import { User } from '@prisma/client';

export interface IUserDao {
  createUser(params: {
    name: string;
    email: string;
    password: string;
  }): Promise<User>;
}

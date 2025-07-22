import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { IUserDao } from './interface/user.dao.interface';
import { User } from '@prisma/client';

@Injectable()
export class UserDao implements IUserDao {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(params: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> {
    return this.prisma.user.create({
      data: {
        name: params.name,
        email: params.email,
        password: params.password,
      },
    });
  }
}

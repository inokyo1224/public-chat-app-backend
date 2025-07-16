import { Inject, Injectable } from '@nestjs/common';
import { IUserDao } from '../dao/interface/user.dao.interface';
import { CreateUserInput } from '../input/create-user.input';
import { User } from '../models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUsecase {
  constructor(
    @Inject('IUserDao')
    private readonly userDao: IUserDao,
  ) {}

  async execute(input: CreateUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    return this.userDao.createUser({
      name: input.name,
      email: input.email,
      password: hashedPassword,
    });
  }
}

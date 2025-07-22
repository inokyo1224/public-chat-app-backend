import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { CreateUserUsecase } from './usecase/create-user.usecase';
import { UserDao } from './dao/user.dao';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    UserResolver,
    CreateUserUsecase,
    {
      provide: 'IUserDao',
      useClass: UserDao,
    },
  ],
})
export class UserModule {}

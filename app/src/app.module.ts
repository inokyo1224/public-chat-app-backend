import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { MessageModule } from './modules/message/message.module';
import { RoomModule } from './modules/room/room.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': false,
      },
    }),
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret',
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
    PrismaModule,
    MessageModule,
    RoomModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MessageResolver } from './message.resolver';
import { MessageUseCase } from './usecase/message.usecase';
import { MessageDao } from './dao/message.dao';
import { PrismaService } from 'src/prisma/prisma.service';
import { PubSubProvider } from './pubsub.provider';

@Module({
  providers: [
    MessageResolver,
    MessageUseCase,
    {
      provide: 'IMessageDao',
      useClass: MessageDao,
    },
    PrismaService,
    PubSubProvider,
  ],
})
export class MessageModule {}

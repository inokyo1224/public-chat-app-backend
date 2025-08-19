import { Module } from '@nestjs/common';
import { MessageResolver } from './message.resolver';
import { CreateMessageUseCase } from './usecase/create-message.usecase';
import { GetMessageUseCase } from './usecase/get-message.usecase';
import { MessageDao } from './dao/message.dao';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { PubSubProvider } from '../../shared/pubsub.provider';

@Module({
  providers: [
    MessageResolver,
    CreateMessageUseCase,
    GetMessageUseCase,
    {
      provide: 'IMessageDao',
      useClass: MessageDao,
    },
    PrismaService,
    PubSubProvider,
  ],
})
export class MessageModule {}

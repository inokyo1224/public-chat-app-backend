import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageInput } from '../input/create-message.input';
import { IMessageDao } from '../dao/interface/message.dao.interface';
import { GraphQLResolveInfo } from 'graphql';
import { convertWithPathMappings } from 'src/shared/prisma/prisma.converter';
import { Message } from '../models/message.model';
import { messageMappings } from '../mappings/message-mappings';

@Injectable()
export class CreateMessageUseCase {
  constructor(
    @Inject('IMessageDao')
    private readonly messageDao: IMessageDao,
  ) {}

  async create(input: CreateMessageInput): Promise<Message> {
    return this.messageDao.create(input);
  }
}

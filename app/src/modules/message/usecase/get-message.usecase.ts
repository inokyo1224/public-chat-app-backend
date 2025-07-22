import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageInput } from '../input/create-message.input';
import { IMessageDao } from '../dao/interface/message.dao.interface';
import { GraphQLResolveInfo } from 'graphql';
import { convertWithPathMappings } from 'src/shared/prisma/prisma.converter';
import { Message } from '../models/message.model';
import { messageMappings } from '../mappings/message-mappings';

@Injectable()
export class GetMessageUseCase {
  constructor(
    @Inject('IMessageDao')
    private readonly messageDao: IMessageDao,
  ) {}

  async findMessagesByRoomId(
    info: GraphQLResolveInfo,
    roomId: string,
  ): Promise<Message[]> {
    const include = convertWithPathMappings(info, messageMappings);

    // if (include.user) {
    //   include.user = {
    //     ...include.user,
    //     where: { deletedAt: null },
    //   };
    // }

    return this.messageDao.findMessagesByRoomId(roomId, include);
  }
}

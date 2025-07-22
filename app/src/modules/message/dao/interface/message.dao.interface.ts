import { CreateMessageInput } from 'src/modules/message/input/create-message.input';
import { Message } from '@prisma/client';
// import { GraphQLResolveInfo } from 'graphql';

export interface IMessageDao {
  findMessagesByRoomId(
    // info: GraphQLResolveInfo,
    roomId: string,
    include: any,
  ): Promise<Message[]>;
  create(input: CreateMessageInput): Promise<Message>;
}

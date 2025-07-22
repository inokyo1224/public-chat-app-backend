import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateMessageInput } from '../input/create-message.input';
import { Message } from '@prisma/client';
import { IMessageDao } from './interface/message.dao.interface';
// import { GraphQLResolveInfo } from 'graphql';
// import { PrismaSelect } from '@paljs/plugins';

@Injectable()
export class MessageDao implements IMessageDao {
  constructor(private readonly prisma: PrismaService) {}

  async findMessagesByRoomId(
    // info: GraphQLResolveInfo,
    roomId: string,
    include: any,
  ): Promise<Message[]> {
    // // GraphQLで指定したフィールドのみ取得するためにPrismaSelectを使用
    // const select = new PrismaSelect(info).value;

    const messages = await this.prisma.message.findMany({
      // ...select,
      where: {
        roomId,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: include,
      // include: {
      //   user: true,
      //   room: {
      //     include: {
      //       roomUsers: {
      //         include: {
      //           user: true,
      //         },
      //       },
      //     },
      //   },
      // },
    });

    return messages;
  }

  async create(input: CreateMessageInput): Promise<Message> {
    return this.prisma.message.create({
      data: {
        roomId: input.roomId,
        userId: input.userId,
        content: input.content,
      },
    });
  }
}

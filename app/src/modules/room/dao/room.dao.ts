import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Room } from '../models/room.model';
import { IRoomDao } from './interface/room.dao.interface';
import { GraphQLResolveInfo } from 'graphql';
import { PrismaSelect } from '@paljs/plugins';

@Injectable()
export class RoomDao implements IRoomDao {
  constructor(private readonly prisma: PrismaService) {}

  async findRoomsByUserId(userId: string, include: any): Promise<Room[]> {
    return await this.prisma.room.findMany({
      include: include,
      where: {
        deletedAt: null,
        roomUsers: {
          some: {
            userId: userId,
            deletedAt: null,
          },
        },
      },
    });
  }

  async createRoom(params: {
    name?: string;
    isGroup: boolean;
    userIds: string[];
  }): Promise<Room> {
    return this.prisma.room.create({
      data: {
        name: params.name,
        isGroup: params.isGroup,
        roomUsers: {
          create: params.userIds.map((userId) => ({
            user: {
              connect: { id: userId },
            },
          })),
        },
      },
      include: {
        roomUsers: {
          include: {
            user: true,
          },
        },
      },
    });
  }
}

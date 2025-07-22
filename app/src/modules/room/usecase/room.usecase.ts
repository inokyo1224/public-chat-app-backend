import { Inject, Injectable } from '@nestjs/common';
import { IRoomDao } from '../dao/interface/room.dao.interface';
import { Room } from '../models/room.model';
import { GraphQLResolveInfo } from 'graphql';
import { convertWithPathMappings } from 'src/shared/prisma/prisma.converter';
import { roomMappings } from '../mappings/room-mappings';

@Injectable()
export class RoomUseCase {
  constructor(
    @Inject('IRoomDao')
    private readonly roomDao: IRoomDao,
  ) {}

  async findRoomsByUserId(
    info: GraphQLResolveInfo,
    userId: string,
  ): Promise<Room[]> {
    const include = convertWithPathMappings(info, roomMappings);

    return this.roomDao.findRoomsByUserId(userId, include);
  }
}

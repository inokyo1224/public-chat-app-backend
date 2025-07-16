import { Inject, Injectable } from '@nestjs/common';
import { IRoomDao } from '../dao/interface/room.dao.interface';
import { CreateRoomInput } from '../input/create-room.input';
import { Room } from '../models/room.model';

@Injectable()
export class CreateRoomUsecase {
  constructor(
    @Inject('IRoomDao')
    private readonly roomDao: IRoomDao,
  ) {}

  async execute(input: CreateRoomInput): Promise<Room> {
    return await this.roomDao.createRoom({
      name: input.name,
      isGroup: input.isGroup,
      userIds: input.userIds,
    });
  }
}

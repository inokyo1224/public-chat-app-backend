import { Module } from '@nestjs/common';
import { RoomResolver } from './room.resolver';
import { RoomUseCase } from './usecase/room.usecase';
import { RoomDao } from './dao/room.dao';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateRoomUsecase } from './usecase/create-room.usecase';

@Module({
  providers: [
    RoomResolver,
    RoomUseCase,
    CreateRoomUsecase,
    {
      provide: 'IRoomDao',
      useClass: RoomDao,
    },
    PrismaService,
  ],
})
export class RoomModule {}

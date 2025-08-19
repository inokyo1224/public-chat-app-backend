import { Args, Mutation, Query, Resolver, Info } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { Room } from './models/room.model';
import { RoomUseCase } from './usecase/room.usecase';
import { CreateRoomInput } from './input/create-room.input';
import { CreateRoomUsecase } from './usecase/create-room.usecase';
import { User } from 'src/modules/user/models/user.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => Room)
export class RoomResolver {
  constructor(
    private readonly roomUseCase: RoomUseCase,
    private readonly createRoomUsecase: CreateRoomUsecase,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Room])
  async myRooms(
    @Info() info: GraphQLResolveInfo,
    @CurrentUser() user: User,
  ): Promise<Room[]> {
    return this.roomUseCase.findRoomsByUserId(info, user.id);
  }

  @Mutation(() => Room)
  async createRoom(@Args('input') input: CreateRoomInput): Promise<Room> {
    return this.createRoomUsecase.execute(input);
  }
}

import { ObjectType, Field, ID } from '@nestjs/graphql';
import { RoomUser } from './room-user.model';

@ObjectType()
export class Room {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field()
  isGroup: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [RoomUser], { nullable: true })
  roomUsers?: RoomUser[];
}

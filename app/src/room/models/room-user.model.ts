import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';
import { Room } from 'src/room/models/room.model';

@ObjectType()
export class RoomUser {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  roomId: string;

  @Field(() => ID)
  userId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Room, { nullable: true })
  room?: Room;
}

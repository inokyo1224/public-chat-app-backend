import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Room } from 'src/room/models/room.model';
import { User } from 'src/user/models/user.model';

@ObjectType()
export class Message {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  roomId: string;

  @Field(() => ID)
  userId: string;

  @Field()
  content: string;

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

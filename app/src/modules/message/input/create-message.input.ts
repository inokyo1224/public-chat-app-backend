import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {
  @Field(() => ID)
  roomId: string;

  @Field(() => ID, { nullable: true })
  userId: string;

  @Field()
  content: string;
}

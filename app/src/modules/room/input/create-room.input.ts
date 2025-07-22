import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRoomInput {
  @Field({ nullable: true })
  name?: string;

  @Field()
  isGroup: boolean;

  @Field(() => [ID])
  userIds: string[];
}

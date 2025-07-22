import {
  Resolver,
  Mutation,
  Query,
  Args,
  Subscription,
  ID,
  Info,
} from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { MessageUseCase } from './usecase/message.usecase';
import { CreateMessageInput } from './input/create-message.input';
import { Message } from './models/message.model';
import { PUB_SUB } from './pubsub.provider';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { User } from 'src/user/models/user.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => Message)
export class MessageResolver {
  constructor(
    private readonly messageUseCase: MessageUseCase,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  @Query(() => [Message])
  async messagesByRoomId(
    @Info() info: GraphQLResolveInfo,
    @Args('roomId', { type: () => ID }) roomId: string,
  ): Promise<Message[]> {
    return this.messageUseCase.findMessagesByRoomId(info, roomId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Message)
  async createMessage(
    @Args('input') input: CreateMessageInput,
    @CurrentUser() user: User,
  ): Promise<Message> {
    const message = this.messageUseCase.create(input, user.id);

    this.pubSub.publish('messageSent', { messageSent: message });

    return message;
  }

  @Subscription(() => Message, {
    resolve: (payload) => payload.messageSent,
  })
  messageSent() {
    return this.pubSub.asyncIterator('messageSent');
  }
}

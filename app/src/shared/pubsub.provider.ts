import { PubSub } from 'graphql-subscriptions';

export const PUB_SUB = 'PUB_SUB';
export const pubSub = new PubSub();

export const PubSubProvider = {
  provide: PUB_SUB,
  useValue: pubSub,
};

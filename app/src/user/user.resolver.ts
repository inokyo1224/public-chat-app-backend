import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { User } from './models/user.model';
import { CreateUserInput } from './input/create-user.input';
import { CreateUserUsecase } from './usecase/create-user.usecase';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly createUserUsecase: CreateUserUsecase) {}

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.createUserUsecase.execute(input);
  }
}

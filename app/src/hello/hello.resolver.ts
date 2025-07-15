import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloResolver {
  @Query(() => String)
  async helloGraphQL(): Promise<string> {
    return 'Hello GraphQL!!';
  }
}

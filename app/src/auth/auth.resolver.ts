import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './input/login.input';
import { AuthPayload } from './input/auth-payload.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/user/models/user.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // 🔐 ログイン処理（JWT発行）
  @Mutation(() => AuthPayload)
  async login(@Args('input') input: LoginInput): Promise<AuthPayload> {
    const user = await this.authService.validateMember(
      input.email,
      input.password,
    );
    if (!user) {
      throw new Error('メールアドレスまたはパスワードが正しくありません');
    }

    const accessToken = await this.authService.login(user);
    return { accessToken };
  }

  // 🙋‍♂️ 現在ログイン中のユーザーを返す
  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}

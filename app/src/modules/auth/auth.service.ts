import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  // パスワード付きのログインバリデーション処理
  async validateMember(email: string, plainPassword: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(plainPassword, user.password);
    if (!isMatch) {
      return null;
    }

    return user;
  }

  // JWTトークン生成
  async login(user: any): Promise<string> {
    const payload = { sub: user.id }; // `sub` は JWT 標準の "主体" を表す
    return this.jwtService.sign(payload);
  }

  // トークンを使ってユーザー情報を取得（オプション）
  async getUserFromToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      const userId = decoded.sub;

      return await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

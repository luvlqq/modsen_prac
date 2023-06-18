import { Injectable } from '@nestjs/common';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtTokensService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async signToken(userId: number, login: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          login,
        },
        {
          secret: this.configService.get<string>('ATSECRET'),
          expiresIn: this.configService.get<string>('ATEXPIREIN'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          login,
        },
        {
          secret: this.configService.get<string>('RTSECRET'),
          expiresIn: this.configService.get<string>('RTEXPIREIN'),
        },
      ),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }
}

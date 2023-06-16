import { Injectable } from '@nestjs/common';
import config from '../../config/config';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokensService {
  constructor(private readonly jwtService: JwtService) {}

  public async signToken(userId: number, login: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          login,
        },
        {
          secret: config.jwt.accessTokenSecret,
          expiresIn: config.jwt.accessTokenExpiresIn,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          login,
        },
        {
          secret: config.jwt.refreshTokenSecret,
          expiresIn: config.jwt.refreshTokenExpiresIn,
        },
      ),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }
}

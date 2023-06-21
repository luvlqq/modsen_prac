import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthRepository } from './auth.repository';

@Injectable()
export class JwtTokensService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly repository: AuthRepository,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
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

  public async accessTokenCookie(
    res: Response,
    accessToken: string,
  ): Promise<void> {
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
    });
  }

  public async refreshTokenCookie(
    res: Response,
    refreshToken: string,
  ): Promise<void> {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
    });
  }

  public async putTokensToCookies(
    userId: number,
    login: string,
    res?: Response,
  ): Promise<void> {
    const tokens = await this.signToken(userId, login);
    await this.accessTokenCookie(res, tokens.accessToken);
    await this.refreshTokenCookie(res, tokens.refreshToken);
    await this.authService.refreshTokens(userId, tokens.refreshToken);
  }

  public async signTokens(userId: number, login: string): Promise<Tokens> {
    return this.signToken(userId, login);
  }

  public async updateRtHash(userId: number, rt: string): Promise<void> {
    const hash = await this.authService.hashData(rt);
    await this.repository.updateRtHash(userId, hash);
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@app/src/modules/prisma/prisma.service';
import { AuthDto } from '@app/src/modules/auth/dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from '@app/src/modules/auth/types/tokens';
import { JwtService } from '@nestjs/jwt';
import config from '@app/src/config/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: AuthDto): Promise<Tokens> {
    const foundUser = await this.prisma.user.findUnique({
      where: { login: dto.login },
    });

    if (foundUser) {
      throw new BadRequestException('User with this login is already exist');
    }

    const hashedPassword = await this.hashData(dto.password);

    const newUser = await this.prisma.user.create({
      data: { login: dto.login, password: hashedPassword },
    });

    const tokens = await this.signTokens(newUser.id, newUser.login);
    await this.updateRtHash(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async login(dto: AuthDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: { login: dto.login },
    });

    if (!user) {
      throw new NotFoundException('User are not exist!');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Access denied! Incorrect password!');
    }
    const tokens = await this.signTokens(user.id, user.login);
    await this.updateRtHash(user.id, tokens.refreshToken);
    return tokens;
  }

  async signOut(userId: number): Promise<boolean> {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashRt: {
          not: null,
        },
      },
      data: {
        hashRt: null,
      },
    });
    return true;
  }

  async hashData(data: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(data, saltOrRounds);
  }

  async signTokens(userId: number, login: string): Promise<Tokens> {
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

  async updateRtHash(userId: number, rt: string) {
    const hash = await this.hashData(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashRt: hash,
      },
    });
  }
}
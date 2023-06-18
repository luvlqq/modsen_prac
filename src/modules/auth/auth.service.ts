import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { JwtTokensService } from './jwt.tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly repository: AuthRepository,
    private readonly jwtTokenService: JwtTokensService,
  ) {}

  public async register(dto: AuthDto): Promise<Tokens> {
    const foundUser = await this.repository.foundUser(dto);

    if (foundUser) {
      throw new BadRequestException('User with this login is already exist');
    }

    const hashedPassword = await this.hashData(dto.password);

    const newUser = await this.repository.createNewUser(dto, hashedPassword);

    const tokens = await this.signTokens(newUser.id, newUser.login);
    await this.updateRtHash(newUser.id, tokens.refreshToken);
    return tokens;
  }

  public async login(dto: AuthDto): Promise<Tokens> {
    const user = await this.repository.foundUser(dto);

    if (!user) {
      throw new NotFoundException('User are not exist!');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Access denied! Incorrect password!');
    }
    const tokens = await this.signTokens(user.id, user.login);
    await this.updateRtHash(user.id, tokens.refreshToken);
    // res.cookie('Token', tokens, { secure: true, httpOnly: true });

    return tokens;
  }

  public async signOut(userId: number): Promise<boolean> {
    return this.repository.signOut(userId);
  }

  public async refreshTokens(userId: number, rt: string): Promise<Tokens> {
    const user = await this.repository.foundUserById(userId);
    if (!user) {
      throw new NotFoundException('User are not exist');
    }
    const rtMatches = await bcrypt.compare(rt, user.hashRt);
    if (!rtMatches) {
      throw new BadRequestException('Tokens are not the same!');
    }
    const tokens = await this.signTokens(user.id, user.login);
    await this.updateRtHash(user.id, tokens.refreshToken);
    return tokens;
  }

  public async hashData(data: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(data, saltOrRounds);
  }

  public async signTokens(userId: number, login: string): Promise<Tokens> {
    return this.jwtTokenService.signToken(userId, login);
  }

  public async updateRtHash(userId: number, rt: string) {
    const hash = await this.hashData(rt);
    await this.repository.updateRtHash(userId, hash);
  }
}

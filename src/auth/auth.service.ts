import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';
import { AuthDto } from '@app/src/auth/dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(dto: AuthDto) {
    const foundUser = await this.prisma.user.findUnique({
      where: { login: dto.login },
    });

    if (foundUser) {
      throw new BadRequestException('User with this login is already exist');
    }

    const hashedPassword = await this.hashPassword(dto.password);

    return this.prisma.user.create({
      data: { login: dto.login, password: hashedPassword },
    });
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  getUserInfo(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}

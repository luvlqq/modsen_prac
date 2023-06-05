import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';

@Injectable()
export class MeetupsService {
  constructor(private readonly prisma: PrismaService) {}
}

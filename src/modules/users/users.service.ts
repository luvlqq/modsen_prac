import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/src/modules/prisma/prisma.service';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly repository: UsersRepository,
  ) {}

  async getUserInfo(id: number) {
    return this.repository.getUserInfo(id);
  }

  async subscribeToMeetup(userId: number, meetupId: number) {
    return this.repository.subscribeToMeetup(userId, meetupId);
  }
}

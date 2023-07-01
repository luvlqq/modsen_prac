import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/src/modules/prisma/prisma.service';
import { UsersRepository } from './users.repository';
import { UserResponse } from './response';
import { MeetupResponse } from '../meetups/responses';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly repository: UsersRepository,
  ) {}

  async getUserInfo(id: number): Promise<UserResponse> {
    return this.repository.getUserInfo(id);
  }

  async subscribeToMeetup(
    userId: number,
    meetupId: number,
  ): Promise<MeetupResponse> {
    return await this.repository.subscribeToMeetup(userId, meetupId);
  }
}

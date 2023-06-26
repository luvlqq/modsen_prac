import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/src/modules/prisma/prisma.service';
import { Meetup } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async getUserInfo(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { followedMeetups: true, createdMeetups: true },
    });
  }

  public async subscribeToMeetup(
    userId: number,
    meetupId: number,
  ): Promise<Meetup> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        followedMeetups: { connect: { id: +meetupId } },
      },
    });
    return this.prisma.meetup.findUnique({ where: { id: +meetupId } });
  }
}

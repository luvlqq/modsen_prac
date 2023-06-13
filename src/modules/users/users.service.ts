import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/src/modules/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  getUserInfo(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { followedMeetups: true, createdMeetups: true },
    });
  }

  async subscribeToMeetup(userId: number, meetupId: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        followedMeetups: { connect: { id: meetupId } },
      },
    });
  }
}

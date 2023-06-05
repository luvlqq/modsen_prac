import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';
import { CreateMeetupDto } from '@app/src/meetups/dto/create.meetup.dto';

@Injectable()
export class MeetupsService {
  constructor(private readonly prisma: PrismaService) {}

  async createAMeetup(dto: CreateMeetupDto) {
    await this.prisma.meetup.create({ data: dto });
    return { message: 'meetup was successfully created' };
  }

  async getAllMeetups() {
    return this.prisma.meetup.findMany();
  }

  async getMeetupById(id: number) {
    const meetup = await this.prisma.meetup.findUnique({ where: { id } });
    if (!meetup) {
      throw new BadRequestException('No event with this id');
    }
    return meetup;
  }

  async deleteMeetupById(id: number) {
    return this.prisma.meetup.delete({ where: { id } });
  }

  async changeInfoInMeetup(id, body: any) {
    return this.prisma.meetup.update({ where: { id }, data: body });
  }
}

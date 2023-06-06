import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';
import { CreateMeetupDto } from '@app/src/meetups/dto/create.meetup.dto';
import { UpdateMeetupDto } from '@app/src/meetups/dto/update.meetup.dto';

@Injectable()
export class MeetupsService {
  constructor(private readonly prisma: PrismaService) {}

  async createAMeetup(dto: CreateMeetupDto) {
    return this.prisma.meetup.create({ data: dto });
  }

  async getAllMeetups(name: string) {
    const query = this.prisma.meetup.findMany({
      where: {
        name: { contains: name },
      },
      orderBy: {
        date: 'asc',
      },
    });

    return query;
  }

  async getMeetupById(id: number) {
    return this.findMeetupById(id);
  }

  async deleteMeetupById(id: number) {
    const meetup = await this.findMeetupById(id);
    return this.prisma.meetup.delete({ where: { id } });
  }

  async changeInfoInMeetup(id: number, dto: UpdateMeetupDto) {
    const meetup = await this.findMeetupById(id);
    return this.prisma.meetup.update({ where: { id }, data: dto });
  }

  async findMeetupById(id: number) {
    const meetup = await this.prisma.meetup.findUnique({ where: { id } });
    if (!meetup) {
      throw new BadRequestException('No meetup with this id');
    }
    return meetup;
  }
}

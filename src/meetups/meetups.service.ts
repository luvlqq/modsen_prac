import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';
import { CreateMeetupDto } from '@app/src/meetups/dto/create.meetup.dto';
import { UpdateMeetupDto } from '@app/src/meetups/dto/update.meetup.dto';
import { Meetup, Prisma } from '@prisma/client';
import { GetMeetupDto } from '@app/src/meetups/dto/get.meetup.dto';

@Injectable()
export class MeetupsService {
  constructor(private readonly prisma: PrismaService) {}

  async createAMeetup(userId: number, dto: CreateMeetupDto): Promise<Meetup> {
    await this.getUserRole(userId);
    return this.prisma.meetup.create({
      data: { ...dto, meetupCreator: userId },
    });
  }

  // async getAllMeetups1(dto: GetMeetupDto): Promise<Meetup[]> {
  //   const query = this.prisma.meetup.findMany({
  //     where: {
  //       name: dto.name,
  //     },
  //     orderBy: {
  //       date: dto.sort[1],
  //     },
  //   });
  //
  //   return query;
  // }

  async getAllMeetups(dto: GetMeetupDto): Promise<Meetup[]> {
    const where: Prisma.MeetupWhereInput = {
      name: { contains: dto.name || undefined },
      date: {
        gte: dto.from ? new Date(dto.from) : undefined,
        lte: dto.to ? new Date(dto.to) : undefined,
      },
    };

    const query = this.prisma.meetup.findMany({
      where,
      orderBy: {
        date: dto.sort || undefined,
      },
    });

    return query;
  }

  async getMeetupById(id: number): Promise<Meetup> {
    return this.findMeetupById(id);
  }

  async deleteMeetupById(userId: number, id: number): Promise<Meetup> {
    await this.getUserRole(userId);
    const meetup = await this.findMeetupById(id);
    await this.compareUserIdAndMeetupId(userId, id);
    return this.prisma.meetup.delete({ where: { id } });
  }

  async changeInfoInMeetup(
    userId: number,
    id: number,
    dto: UpdateMeetupDto,
  ): Promise<Meetup> {
    await this.getUserRole(userId);
    await this.compareUserIdAndMeetupId(userId, id);
    const meetup = await this.findMeetupById(id);
    return this.prisma.meetup.update({ where: { id }, data: dto });
  }

  async findMeetupById(id: number): Promise<Meetup> {
    const meetup = await this.prisma.meetup.findUnique({ where: { id } });
    if (!meetup) {
      throw new BadRequestException('No meetup with this id');
    }
    return meetup;
  }

  async getUserRole(userId: number) {
    const userRole = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (userRole.role != 'ADMIN') {
      throw new HttpException('Access denied', 403);
    }
  }

  async compareUserIdAndMeetupId(userId: number, id: number) {
    const meetupOwner = await this.prisma.meetup.findUnique({ where: { id } });
    if (userId != meetupOwner.meetupCreator) {
      throw new HttpException('Access denied!', 403);
    }
  }
}

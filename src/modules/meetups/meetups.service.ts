import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '@app/src/modules/prisma/prisma.service';
import { CreateMeetupDto, UpdateMeetupDto, GetMeetupDto } from './dto';
import { Prisma } from '@prisma/client';
import { Logger } from 'nestjs-pino';
import { MeetupResponse } from './response/meetup.response';

@Injectable()
export class MeetupsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  async createAMeetup(
    userId: number,
    dto: CreateMeetupDto,
  ): Promise<MeetupResponse> {
    await this.getUserRole(userId);
    await this.logger.log('Create log', userId, dto);
    return this.prisma.meetup.create({
      data: { ...dto, meetupCreator: userId },
    });
  }

  async getAllMeetups(dto: GetMeetupDto): Promise<MeetupResponse[]> {
    const where: Prisma.MeetupWhereInput = {
      name: { contains: dto.name || undefined },
      date: {
        gte: dto.from ? new Date(dto.from) : undefined,
        lte: dto.to ? new Date(dto.to) : undefined,
      },
    };

    const query: Prisma.MeetupFindManyArgs = {
      where,
      orderBy: {
        date: dto.sort || undefined,
      },
      take: +dto.limit || 1,
      skip: (dto.page - 1) * dto.limit || undefined,
    };

    return this.prisma.meetup.findMany(query);
  }

  async getMeetupById(id: number): Promise<MeetupResponse> {
    return this.findMeetupById(id);
  }

  async deleteMeetupById(userId: number, id: number): Promise<MeetupResponse> {
    await this.getUserRole(userId);
    const meetup = await this.findMeetupById(+id);
    await this.compareUserIdAndMeetupId(userId, id);
    return this.prisma.meetup.delete({ where: { id: +id } });
  }

  async changeInfoInMeetup(
    userId: number,
    id: number,
    dto: UpdateMeetupDto,
  ): Promise<MeetupResponse> {
    await this.getUserRole(userId);
    await this.compareUserIdAndMeetupId(userId, id);
    const meetup = await this.findMeetupById(id);
    return this.prisma.meetup.update({ where: { id: +id }, data: dto });
  }

  async findMeetupById(id: number): Promise<MeetupResponse> {
    const meetup = await this.prisma.meetup.findUnique({ where: { id: +id } });
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
    const meetupOwner = await this.prisma.meetup.findUnique({
      where: { id: +id },
    });
    if (userId != meetupOwner.meetupCreator) {
      throw new HttpException('Access denied!', 403);
    }
  }
}

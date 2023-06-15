import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { CreateMeetupDto, UpdateMeetupDto, GetMeetupDto } from './dto';
import { Logger } from 'nestjs-pino';
import { MeetupResponse } from './response/meetup.response';
import { MeetupsRepository } from './meetups.repository';

@Injectable()
export class MeetupsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
    private readonly repository: MeetupsRepository,
  ) {}

  public async createAMeetup(
    userId: number,
    dto: CreateMeetupDto,
  ): Promise<MeetupResponse> {
    await this.getUserRole(userId);
    return this.repository.createAMeetup(userId, dto);
  }

  public async getAllMeetups(dto: GetMeetupDto): Promise<MeetupResponse[]> {
    return this.repository.getAllMeetups(dto);
  }

  public async getMeetupById(id: number): Promise<MeetupResponse> {
    return this.findMeetupById(id);
  }

  public async deleteMeetupById(
    userId: number,
    id: number,
  ): Promise<MeetupResponse> {
    await this.getUserRole(userId);
    await this.findMeetupById(+id);
    await this.compareUserIdAndMeetupId(userId, id);
    return this.repository.deleteMeetupById(userId, id);
  }

  public async changeInfoInMeetup(
    userId: number,
    id: number,
    dto: UpdateMeetupDto,
  ): Promise<MeetupResponse> {
    await this.getUserRole(userId);
    await this.compareUserIdAndMeetupId(userId, id);
    await this.findMeetupById(id);
    return this.repository.changeInfoInMeetup(userId, id, dto);
  }

  public async findMeetupById(id: number): Promise<MeetupResponse> {
    const meetup = await this.repository.getMeetupById(id);
    if (!meetup) {
      throw new BadRequestException('No meetup with this id');
    }
    return meetup;
  }

  public async getUserRole(userId: number) {
    const userRole = await this.repository.getUserRole(userId);
    if (userRole.role != 'ADMIN') {
      throw new HttpException('Access denied', 403);
    }
  }

  public async compareUserIdAndMeetupId(userId: number, id: number) {
    const meetupOwner = await this.repository.getMeetupOwnerId(id);
    if (userId != meetupOwner.meetupCreator) {
      throw new HttpException('Access denied!', 403);
    }
  }
}

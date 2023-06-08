import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMeetupDto } from '@app/src/meetups/dto/create.meetup.dto';
import { UpdateMeetupDto } from '@app/src/meetups/dto/update.meetup.dto';
import { Meetup } from '@prisma/client';
import { GetCurrentUserId } from '@app/src/common/decorators/get.current.userId.decorator';

@ApiTags('Meetups')
@Controller('meetups')
export class MeetupsController {
  constructor(private readonly meetupsService: MeetupsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all meetups' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  getAllMeetups(@Query('name') name?: string): Promise<Meetup[]> {
    return this.meetupsService.getAllMeetups(name);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get meetup by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  getMeetupById(@Param('id') id: number): Promise<Meetup> {
    return this.meetupsService.getMeetupById(id);
  }

  @Post('createMeetup')
  @ApiOperation({ summary: 'Create a meetup' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  createAMeetup(
    @GetCurrentUserId() userId: number,
    @Body() dto: CreateMeetupDto,
  ): Promise<Meetup> {
    return this.meetupsService.createAMeetup(userId, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Change meetup parameters by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  changeInfoInMeetup(
    @GetCurrentUserId() userId: number,
    @Param('id') id: number,
    @Body() dto: UpdateMeetupDto,
  ): Promise<Meetup> {
    return this.meetupsService.changeInfoInMeetup(userId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete meetup by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  deleteMeetupById(
    @GetCurrentUserId() userId: number,
    @Param('id') id: number,
  ): Promise<Meetup> {
    return this.meetupsService.deleteMeetupById(userId, id);
  }
}

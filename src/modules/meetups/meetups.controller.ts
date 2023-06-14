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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMeetupDto, UpdateMeetupDto, GetMeetupDto } from './dto';
import { GetCurrentUserId } from '../../common/decorators';
import { MeetupResponse } from './response/meetup.response';
import { PinoService } from '@app/src/modules/pino/pino.service';

@ApiTags('Meetups')
@Controller('meetups')
export class MeetupsController {
  constructor(
    private readonly meetupsService: MeetupsService,
    private readonly pino: PinoService,
  ) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all meetups' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  getAllMeetups(@Query() dto: GetMeetupDto): Promise<MeetupResponse[]> {
    this.pino.logMeetupsShow();
    return this.meetupsService.getAllMeetups(dto);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get meetup by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  getMeetupById(@Param('id') id: number): Promise<MeetupResponse> {
    this.pino.logMeetupsShow();
    return this.meetupsService.getMeetupById(id);
  }

  @Post('createMeetup')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a meetup' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  createAMeetup(
    @GetCurrentUserId() userId: number,
    @Body() dto: CreateMeetupDto,
  ): Promise<MeetupResponse> {
    this.pino.logMeetupsCreate();
    return this.meetupsService.createAMeetup(userId, dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change meetup parameters by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  changeInfoInMeetup(
    @GetCurrentUserId() userId: number,
    @Param('id') id: number,
    @Body() dto: UpdateMeetupDto,
  ): Promise<MeetupResponse> {
    this.pino.logMeetupsUpdate();
    return this.meetupsService.changeInfoInMeetup(userId, id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete meetup by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  deleteMeetupById(
    @GetCurrentUserId() userId: number,
    @Param('id') id: number,
  ): Promise<MeetupResponse> {
    this.pino.logMeetupsDelete();
    return this.meetupsService.deleteMeetupById(userId, id);
  }
}

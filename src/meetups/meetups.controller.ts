import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Meetups')
@Controller('meetups')
export class MeetupsController {
  constructor(private readonly meetupsService: MeetupsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all meetups' })
  getAllMeetups() {}

  @Get(':id')
  @ApiOperation({ summary: 'Get meetup by id' })
  getMeetupById() {}

  @Post('createmeetup')
  @ApiOperation({ summary: 'Create a meetup' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  createAMeetup() {}

  @Patch(':id')
  @ApiOperation({ summary: 'Change meetup parameters by id' })
  changeInfoInMeetup() {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete meetup by id' })
  deleteMeetupById() {}
}

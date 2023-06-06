import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMeetupDto } from '@app/src/meetups/dto/create.meetup.dto';
import { UpdateMeetupDto } from '@app/src/meetups/dto/update.meetup.dto';

@ApiTags('Meetups')
@Controller('meetups')
export class MeetupsController {
  constructor(private readonly meetupsService: MeetupsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all meetups' })
  getAllMeetups() {
    return this.meetupsService.getAllMeetups();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get meetup by id' })
  getMeetupById(@Param('id') id: number) {
    return this.meetupsService.getMeetupById(id);
  }

  @Post('createmeetup')
  @ApiOperation({ summary: 'Create a meetup' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  createAMeetup(@Body() dto: CreateMeetupDto) {
    return this.meetupsService.createAMeetup(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Change meetup parameters by id' })
  changeInfoInMeetup(@Param('id') id: number, @Body() dto: UpdateMeetupDto) {
    return this.meetupsService.changeInfoInMeetup(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete meetup by id' })
  deleteMeetupById(@Param('id') id: number) {
    return this.meetupsService.deleteMeetupById(id);
  }
}

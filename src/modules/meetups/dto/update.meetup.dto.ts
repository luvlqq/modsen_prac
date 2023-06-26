import { PartialType } from '@nestjs/swagger';
import { CreateMeetupDto } from '@app/src/modules/meetups/dto/create.meetup.dto';

export class UpdateMeetupDto extends PartialType(CreateMeetupDto) {}

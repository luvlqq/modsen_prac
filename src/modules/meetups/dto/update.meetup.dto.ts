import { IsArray, IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMeetupDto {
  @ApiProperty({ description: 'Meetup name', nullable: true })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Meetup description', nullable: true })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Meetup tags', nullable: true })
  @IsOptional()
  @IsArray()
  tags: string[];

  @ApiProperty({ description: 'Meetup place', nullable: true })
  @IsOptional()
  @IsString()
  place: string;

  @ApiProperty({ description: 'Meetup date', nullable: true })
  @IsOptional()
  @IsDateString()
  date: Date;
}

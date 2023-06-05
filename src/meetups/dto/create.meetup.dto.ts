import { IsArray, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateMeetupDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsArray()
  tags: string[];

  @IsNotEmpty()
  @IsString()
  place: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;
}

import { IsArray, IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateMeetupDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @IsOptional()
  tags: string[];

  @IsString()
  @IsOptional()
  place: string;

  @IsDateString()
  @IsOptional()
  date: Date;
}

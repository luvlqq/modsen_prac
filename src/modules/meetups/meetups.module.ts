import { Module } from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { MeetupsController } from './meetups.controller';
import { PinoService } from '@app/src/modules/pino/pino.service';

@Module({
  controllers: [MeetupsController],
  providers: [MeetupsService, PinoService],
})
export class MeetupsModule {}

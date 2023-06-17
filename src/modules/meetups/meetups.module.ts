import { Logger, Module } from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { MeetupsController } from './meetups.controller';
import { MeetupsRepository } from './meetups.repository';

@Module({
  controllers: [MeetupsController],
  providers: [MeetupsService, MeetupsRepository, Logger],
})
export class MeetupsModule {}

import { Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

@Injectable()
export class PinoService {
  constructor(private readonly logger: Logger) {}

  logMeetupsShow() {
    return this.logger.log('Show meetups');
  }

  logMeetupsCreate() {
    return this.logger.log('Create a meetup');
  }

  logMeetupsUpdate() {
    return this.logger.log('Update a meetup');
  }

  logMeetupsDelete() {
    return this.logger.log('Delete a meetup');
  }
}

import { Global, Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { PinoService } from '@app/src/modules/pino/pino.service';

@Global()
@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'info',
        redact: ['req.headers', 'req.query', 'req.params', 'req'],
        transport: {
          target: 'pino-pretty',
          options: {
            level: 'info',
            singleLine: true,
          },
        },
        autoLogging: false,
      },
    }),
  ],
  providers: [PinoService],
  exports: [PinoService],
})
export class PinoModule {}

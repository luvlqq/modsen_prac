import * as process from 'process';

if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from '@app/src/common/initializations/initialization.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.use(cookieParser());

  const configService = app.get(ConfigService);

  setupSwagger(app);

  await app.listen(configService.get<number>('PORT'));
}
bootstrap();

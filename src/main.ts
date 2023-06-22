import * as process from 'process';

if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './common/initializations/';
import { PrismaClientExceptionFilter } from './filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableShutdownHooks();

  const configService = app.get(ConfigService);

  setupSwagger(app);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  process.on('SIGINT', async () => {
    Logger.log('Server close by user');
    await app.close();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    Logger.log('Server close by system');
    await app.close();
    process.exit(0);
  });

  await app.listen(configService.get<number>('PORT'));
}
bootstrap();

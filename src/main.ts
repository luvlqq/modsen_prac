if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';
import config from '@app/src/config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  const swagger = new DocumentBuilder()
    .setTitle('Meetup API')
    .setDescription('The meetup API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('doc', app, document);

  await app.listen(config.application.port);
}
bootstrap();

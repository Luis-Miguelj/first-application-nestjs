import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookies from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookies())
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3000);
}
bootstrap();

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT, ENVIRONMENT } from './env';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors();
  await app.listen(PORT);
  Logger.log(
    `🚀 Application is running in ${ENVIRONMENT} mode on: http://localhost:${PORT}/graphql`
  );
}

bootstrap();

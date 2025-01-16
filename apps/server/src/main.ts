import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  await app.listen(PORT);
  Logger.log(`🚀 Application is running on: http://localhost:${PORT}/graphql`);
}

bootstrap();

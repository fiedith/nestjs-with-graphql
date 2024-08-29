import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './commons/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // requests that require validation will go through validation pipe before reaching controllers/reoslvers
  app.useGlobalFilters(new HttpExceptionFilter()); // requests that cause HttpException will be globally caught by custom defined HttpExceptionFilter before reaching controllers/resolvers
  await app.listen(3000);
}
bootstrap();

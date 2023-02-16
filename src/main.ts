import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const port = 5001;

  console.log('port.......');

  await app.listen(port, () => {
    console.log('Listening on port', port);
  });
}

bootstrap();

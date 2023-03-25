import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NextFunction } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Use middlewares...');
    next();
  });

  app.useGlobalPipes(new ValidationPipe());
  const port = 5001;

  console.log('port.......');

  await app.listen(port, () => {
    console.log('Listening on port', port);
  });
}

bootstrap();

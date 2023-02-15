import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 5001;

  await app.listen(port, () => {
    console.log('Listening on port', port);
  });
}
bootstrap();

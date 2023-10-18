import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, httpsOptions: {
      key: fs.readFileSync('/home/ubuntu/live/furqan.abdulmelikambaw.tech/privkey.pem'),
      cert: fs.readFileSync('/home/ubuntu/live/furqan.abdulmelikambaw.tech/cert_private_key.pem'),
    }, {cors: true});
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();

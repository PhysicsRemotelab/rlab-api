import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { readFileSync } from 'fs';

dotenv.config();

const httpsOptions = {
  key: readFileSync('./ssl/server.key'),
  cert: readFileSync('./ssl/public-certificate.pem'),
};

async function bootstrap() {
  //const app = await NestFactory.create(AppModule, { httpsOptions });
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: true }));
  await app.listen(process.env.API_PORT);
}

bootstrap();

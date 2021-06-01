import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { readFileSync } from 'fs';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

dotenv.config();

const httpsOptions = {
  key: readFileSync('./ssl/server.key'),
  cert: readFileSync('./ssl/public-certificate.pem'),
};

const config = new DocumentBuilder()
    .setTitle('Remote Lab API documentation')
    .setDescription('Remote Lab API documentation')
    .setVersion('1.0')
    .addTag('rlab')
    .build();

async function bootstrap() {
  //const app = await NestFactory.create(AppModule, { httpsOptions });
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: true }));
  await app.listen(process.env.API_PORT);
}

bootstrap();

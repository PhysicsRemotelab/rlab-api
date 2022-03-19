import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as morgan from 'morgan';

const config = new DocumentBuilder()
    .setTitle('Remote Lab API documentation')
    .setDescription('Remote Lab API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, {
        customSiteTitle: 'Remote Lab API documentation'
    });
    app.enableCors();
    app.use(morgan('tiny'));
    app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: true }));
    await app.listen(process.env.API_PORT);
}

bootstrap();

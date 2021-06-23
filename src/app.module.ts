import { Module } from '@nestjs/common';
import { LabsModule } from './labs/labs.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabEntity } from './labs/lab.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [LabEntity],
        synchronize: false
      })
    }),
    CoreModule,
    AuthModule,
    LabsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}

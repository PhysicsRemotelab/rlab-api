import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LabsModule } from './labs/labs.module';
import { UsersModule } from './users/users.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { MeasurementsModule } from './measurements/measurements.module';
import { HistoryModule } from './history/history.module';
import * as dotenv from 'dotenv';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true
    }),
    CoreModule,
    AuthModule,
    LabsModule,
    MeasurementsModule,
    UsersModule,
    HistoryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {

}

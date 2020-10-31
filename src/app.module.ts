import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LabsModule } from './labs/labs.module';
import { UsersModule } from './users/users.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { MeasurementsModule } from './measurements/measurements.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'strongpassword',
      database: 'remotelabdb',
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

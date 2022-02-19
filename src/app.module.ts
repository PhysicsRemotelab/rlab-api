import { Module } from '@nestjs/common';
import { LabsModule } from './labs/labs.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { MeasurementsModule } from './measurements/measurements.module';
import { BookingModule } from './booking/booking.module';
import { AuditModule } from './audit/audit.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audit } from './audit/audit.model';
import { User } from './users/user.model';
import { Booking } from './booking/booking.model';
import { Measurement } from './measurements/measurements.model';
import { Lab } from './labs/lab.model';
import { UsersModule } from './users/users.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [Audit, User, Booking, Measurement, Lab],
        synchronize: true
      })
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 4002
      }
    }),
    BullModule.registerQueue({
      name: 'message-queue'
    }),
    AuthModule,
    UsersModule,
    CoreModule,
    LabsModule,
    MeasurementsModule,
    BookingModule,
    AuditModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

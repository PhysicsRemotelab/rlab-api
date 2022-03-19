import { Module } from '@nestjs/common';
import { LabsModule } from './labs/labs.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { MeasurementsModule } from './measurements/measurements.module';
import { BookingModule } from './booking/booking.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/user.entity';
import { BookingEntity } from './booking/booking.entity';
import { MeasurementEntity } from './measurements/measurements.entity';
import { LabEntity } from './labs/lab.entity';
import { UsersModule } from './users/users.module';
import { BullModule } from '@nestjs/bull';
import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();

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
                entities: [UserEntity, BookingEntity, MeasurementEntity, LabEntity],
                synchronize: true,
                namingStrategy: new SnakeNamingStrategy()
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
        BookingModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}

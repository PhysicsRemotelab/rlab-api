import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.model';
import { MeasurementController } from './measurements.controller';
import { Measurement } from './measurements.model';
import { MeasurementService } from './measurements.service';

@Module({
    imports: [TypeOrmModule.forFeature([Measurement, User])],
    providers: [MeasurementService],
    controllers: [MeasurementController],
    exports: [MeasurementService]
})
export class MeasurementsModule {}

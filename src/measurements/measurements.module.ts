import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/users.repository';
import { MeasurementRepository } from './measurement.repository';
import { MeasurementController } from './measurements.controller';
import { Measurement } from './measurements.model';
import { MeasurementService } from './measurements.service';

@Module({
  imports: [TypeOrmModule.forFeature([Measurement])],
  providers: [MeasurementService, MeasurementRepository, UserRepository],
  controllers: [MeasurementController]
})
export class MeasurementsModule {}

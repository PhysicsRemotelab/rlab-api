import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasurementController } from './measurements.controller';
import { Measurement } from './measurements.model';
import { MeasurementService } from './measurements.service';

@Module({
  imports: [TypeOrmModule.forFeature([Measurement])],
  providers: [MeasurementService],
  controllers: [MeasurementController]
})
export class MeasurementsModule {}

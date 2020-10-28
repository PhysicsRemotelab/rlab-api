import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MeasurementController } from './measurements.controller';
import { Measurement } from './measurements.model';
import { MeasurementService } from './measurements.service';

@Module({
  imports: [SequelizeModule.forFeature([Measurement])],
  providers: [MeasurementService],
  controllers: [MeasurementController]
})
export class MeasurementsModule { }
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import { MeasurementController } from './measurements.controller';
import { Measurement } from './measurements.model';
import { MeasurementService } from './measurements.service';

@Module({
  imports: [SequelizeModule.forFeature([Measurement, User])],
  providers: [MeasurementService],
  controllers: [MeasurementController]
})
export class MeasurementsModule { }
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import UserEntity from 'src/users/user.entity';
import { MeasurementEntity } from './measurement.entity';
import { MeasurementController } from './measurements.controller';
import { MeasurementService } from './measurements.service';

@Module({
  imports: [TypeOrmModule.forFeature([MeasurementEntity, UserEntity])],
  providers: [MeasurementService],
  controllers: [MeasurementController]
})
export class MeasurementsModule { }

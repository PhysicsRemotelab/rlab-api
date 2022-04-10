import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from 'src/core/file.service';
import { UserEntity } from '../users/user.entity';
import { MeasurementController } from './measurements.controller';
import { MeasurementEntity } from './measurements.entity';
import { MeasurementService } from './measurements.service';

@Module({
    imports: [TypeOrmModule.forFeature([MeasurementEntity, UserEntity])],
    providers: [MeasurementService, FileService],
    controllers: [MeasurementController],
    exports: [MeasurementService]
})
export class MeasurementsModule {}

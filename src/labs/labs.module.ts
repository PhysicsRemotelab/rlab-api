import { Module } from '@nestjs/common';
import { LabsService } from './labs.service';
import { LabsController } from './labs.controller';
import { LabEntity } from './lab.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingModule } from 'src/booking/booking.module';

@Module({
    imports: [TypeOrmModule.forFeature([LabEntity]), BookingModule],
    providers: [LabsService],
    controllers: [LabsController],
    exports: [LabsService]
})
export class LabsModule {}

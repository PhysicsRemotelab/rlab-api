import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { MeasurementDto } from './measurement.dto';
import { MeasurementEntity } from './measurements.entity';
import { MeasurementService } from './measurements.service';

@Controller('api/v1/measurements')
export class MeasurementController {
    constructor(private readonly measurementService: MeasurementService) {}

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Get()
    findAll(): Promise<MeasurementEntity[]> {
        return this.measurementService.findAll();
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Post()
    create(@Body() measurementDto: MeasurementDto): Promise<MeasurementEntity> {
        return this.measurementService.create(measurementDto);
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Delete(':id')
    remove(@Param('id') id: number): Promise<MeasurementEntity> {
        return this.measurementService.remove(id);
    }
}

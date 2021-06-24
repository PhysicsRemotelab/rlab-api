import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { MeasurementDto } from './measurement.dto';
import { MeasurementEntity } from './measurement.entity';
import { MeasurementService } from './measurements.service';

@Controller('measurements')
export class MeasurementController {

    constructor(
        private readonly measurementService: MeasurementService
    ) { }

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

    @Get(':id')
    findOne(@Param('id') id: string): Promise<MeasurementEntity> {
        return this.measurementService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Delete(':id')
    remove(@Param('id') id: string): Promise<number> {
        return this.measurementService.remove(id);
    }
}

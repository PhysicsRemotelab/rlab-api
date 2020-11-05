import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { MeasurementDto } from './measurement.dto';
import { Measurement } from './measurements.model';
import { MeasurementService } from './measurements.service';
import { Permissions } from '../auth/permissions.decorator';

@Controller('measurements')
export class MeasurementController {

    constructor(
        private readonly measurementService: MeasurementService
    ) { }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    //@Permissions('read:measurements')
    @Get()
    findAll(): Promise<Measurement[]> {
        return this.measurementService.findAll();
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    //@Permissions('create:measurements')
    @Post()
    create(@Body() measurementDto: MeasurementDto): Promise<Measurement> {
        return this.measurementService.create(measurementDto);
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions('update:measurements')
    @Put()
    update(@Body() measurementDto: MeasurementDto): Promise<Measurement> {
        return this.measurementService.update(measurementDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Measurement> {
        return this.measurementService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    //@Permissions('delete:measurements')
    @Delete(':id')
    remove(@Param('id') id: string): Promise<number> {
        return this.measurementService.remove(id);
    }

}
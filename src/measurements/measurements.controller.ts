import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { MeasurementDto } from './measurement.dto';
import { Measurement } from './measurements.model';
import { MeasurementService } from './measurements.service';

@Controller('measurements')
export class MeasurementController {
  constructor(private readonly measurementService: MeasurementService) {}

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get()
  findAll(): Promise<Measurement[]> {
    return this.measurementService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Post()
  create(@Body() measurementDto: MeasurementDto): Promise<Measurement> {
    return this.measurementService.create(measurementDto);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<Measurement> {
    return this.measurementService.remove(id);
  }
}

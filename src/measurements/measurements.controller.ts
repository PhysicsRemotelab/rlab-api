import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post
} from '@nestjs/common';
import { MeasurementDto } from './measurement.dto';
import { Measurement } from './measurements.model';
import { MeasurementService } from './measurements.service';

@Controller('measurements')
export class MeasurementController {
  constructor(private readonly measurementService: MeasurementService) {}

  @Get()
  findAll(): Promise<Measurement[]> {
    return this.measurementService.findAll();
  }

  @Post()
  create(@Body() measurementDto: MeasurementDto): Promise<Measurement> {
    return this.measurementService.create(measurementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<Measurement> {
    return this.measurementService.remove(id);
  }
}

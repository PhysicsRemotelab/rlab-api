import { Body, Controller, Delete, Get, Param, Post, StreamableFile, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequest, Unauthorized } from '../core/swagger.annotations';
import { MeasurementDto } from './measurement.dto';
import { MeasurementEntity } from './measurements.entity';
import { MeasurementService } from './measurements.service';

@ApiResponse(BadRequest)
@ApiResponse(Unauthorized)
@ApiTags('Measurements')
@Controller('api/v1/measurements')
export class MeasurementController {
    constructor(private readonly measurementService: MeasurementService) {}

    @ApiResponse({
        status: 200,
        description: 'OK',
        type: MeasurementEntity
    })
    @ApiOperation({
        summary: 'Get measurements list'
    })
    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll(): Promise<MeasurementEntity[]> {
        return this.measurementService.findAll();
    }

    @ApiResponse({
        status: 201,
        description: 'Created',
        type: MeasurementEntity
    })
    @ApiOperation({
        summary: 'Create measurement'
    })
    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() measurementDto: MeasurementDto): Promise<MeasurementEntity> {
        return this.measurementService.create(measurementDto);
    }

    @ApiResponse({
        status: 200,
        description: 'OK',
        type: MeasurementEntity
    })
    @ApiOperation({
        summary: 'Delete measurement'
    })
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    remove(@Param('id') id: number): Promise<MeasurementEntity> {
        return this.measurementService.remove(id);
    }

    @ApiResponse({
        status: 200,
        description: 'OK',
        type: StreamableFile
    })
    @ApiOperation({
        summary: 'Download data file'
    })
    @UseGuards(AuthGuard('jwt'))
    @Get('/download/:id')
    public async download(@Param('id') id: number): Promise<StreamableFile> {
        return await this.measurementService.downloadStream(id);
    }
}

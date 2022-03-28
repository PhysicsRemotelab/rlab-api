import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { MeasurementDto } from './measurement.dto';
import { MeasurementEntity } from './measurements.entity';
import { MeasurementService } from './measurements.service';

@ApiTags('Measurements')
@Controller('api/v1/measurements')
export class MeasurementController {
    constructor(private readonly measurementService: MeasurementService) {}

    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({
        status: 200,
        description: 'Get all user measurements',
        type: MeasurementEntity
    })
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Get()
    findAll(): Promise<MeasurementEntity[]> {
        return this.measurementService.findAll();
    }

    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({
        status: 200,
        description: 'Create user measurement',
        type: MeasurementEntity
    })
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Post()
    create(@Body() measurementDto: MeasurementDto): Promise<MeasurementEntity> {
        return this.measurementService.create(measurementDto);
    }

    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({
        status: 200,
        description: 'Delete user measurement',
        type: MeasurementEntity
    })
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Delete(':id')
    remove(@Param('id') id: number): Promise<MeasurementEntity> {
        return this.measurementService.remove(id);
    }
}

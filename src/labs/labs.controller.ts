import { Controller, Get, Param } from '@nestjs/common';
import { LabsService } from './labs.service';
import { LabEntity } from './lab.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Labs')
@Controller('api/v1/labs')
export class LabsController {
    constructor(private readonly labsService: LabsService) {}

    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({
        status: 200,
        description: 'Get all labs list',
        type: LabEntity
    })
    @Get()
    findAll(): Promise<LabEntity[]> {
        return this.labsService.findAll();
    }

    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({
        status: 200,
        description: 'Get lab details',
        type: LabEntity
    })
    @Get(':code')
    findOne(@Param('code') code: string): Promise<LabEntity> {
        return this.labsService.findOne(code);
    }
}

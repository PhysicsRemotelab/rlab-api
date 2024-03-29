import { Controller, Get, Param } from '@nestjs/common';
import { LabsService } from './labs.service';
import { LabEntity } from './lab.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequest, Unauthorized } from '../core/swagger.annotations';

@ApiTags('Labs')
@Controller('api/v1/labs')
export class LabsController {
    constructor(private readonly labsService: LabsService) {}

    @ApiResponse({
        status: 200,
        description: 'OK',
        type: LabEntity
    })
    @ApiOperation({
        summary: 'Get labs list'
    })
    @Get()
    public findAll(): Promise<LabEntity[]> {
        return this.labsService.findAll();
    }

    @ApiResponse(BadRequest)
    @ApiResponse(Unauthorized)
    @ApiResponse({
        status: 200,
        description: 'OK',
        type: LabEntity
    })
    @ApiOperation({
        summary: 'Get lab details by code'
    })
    @Get(':code')
    public findOne(@Param('code') code: string): Promise<LabEntity> {
        return this.labsService.findOne(code);
    }
}

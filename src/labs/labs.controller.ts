import { Controller, Get, Param } from '@nestjs/common';
import { LabsService } from './labs.service';
import { LabEntity } from './lab.entity';

@Controller('api/v1/labs')
export class LabsController {
    constructor(private readonly labsService: LabsService) {}

    @Get()
    findAll(): Promise<LabEntity[]> {
        return this.labsService.findAll();
    }

    @Get(':code')
    findOne(@Param('code') code: string): Promise<LabEntity> {
        return this.labsService.findOne(code);
    }
}

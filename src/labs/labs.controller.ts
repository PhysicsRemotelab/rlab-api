import { Controller, Get, Param } from '@nestjs/common';
import { LabsService } from './labs.service';
import { Lab } from './lab.model';

@Controller('labs')
export class LabsController {
    constructor(private readonly labsService: LabsService) {}

    @Get()
    findAll(): Promise<Lab[]> {
        return this.labsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Lab> {
        return this.labsService.findOne(id);
    }
}

import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { LabsService } from './labs.service';
import { LabEntity } from './lab.entity';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { LabDto } from './lab.dto';

@Controller('labs')
export class LabsController {

    constructor(
        private readonly labsService: LabsService
    ) { }

    @Get()
    public async findAll(): Promise<LabEntity[]> {
        return await this.labsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<LabEntity> {
        return this.labsService.findOne(id);
    }
}

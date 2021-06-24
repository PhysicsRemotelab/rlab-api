import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { LabsService } from './labs.service';
import { LabEntity } from './lab.entity';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { LabDto } from './lab.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Put('/use')
    useLab(@Body() labDto: LabDto): Promise<LabEntity> {
        return this.labsService.useLab(labDto);
     }
 
     @UseGuards(AuthGuard('jwt'), PermissionsGuard)
     @Put('/free')
     freeLab(@Body() labDto: LabDto): Promise<LabEntity> {
        return this.labsService.freeLab(labDto);
     }
}

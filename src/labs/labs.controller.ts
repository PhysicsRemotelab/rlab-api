import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { LabsService } from './labs.service';
import { Lab } from './lab.model';
import { LabDto } from './lab.dto';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('labs')
export class LabsController {

    constructor(
        private readonly labsService: LabsService
    ) { }

    @Get()
    // @Permissions('find:labs')
    findAll(): Promise<Lab[]> {
        return this.labsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Lab> {
        return this.labsService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    // @Permissions('create:labs')
    @Post()
    create(@Body() labDto: LabDto): Promise<Lab> {
        return this.labsService.create(labDto);
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    // @Permissions('delete:labs')
    @Delete(':id')
    remove(@Param('id') id: string): Promise<number> {
        return this.labsService.remove(id);
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    //@Permissions('update:labs')
    @Put()
    update(@Body() labDto: LabDto): Promise<Lab> {
        return this.labsService.update(labDto);
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
   // @Permissions('use:lab')
    @Put('/use')
    useLab(@Body() labDto: LabDto): Promise<Lab> {
        return this.labsService.useLab(labDto);
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    //@Permissions('use:lab')
    @Put('/free')
    freeLab(@Body() labDto: LabDto): Promise<Lab> {
        return this.labsService.freeLab(labDto);
    }
}

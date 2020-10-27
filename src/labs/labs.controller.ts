import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
  } from '@nestjs/common';
  import { LabsService } from './labs.service';
  import { Lab } from './lab.entity';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from '../permissions.decorator';
import { PermissionsGuard } from '../permissions.guard';

@Controller('labs')
export class LabsController {

    constructor(
        private readonly labsService: LabsService
    ) { }

    @Get()
    async findAll(): Promise<Lab[]> {
        return this.labsService.findAll();
    }

    @Get(':id')
    async find(@Param('id') id: number): Promise<Lab> {
      return this.labsService.find(id);
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Post()
    @Permissions('create:labs')
    async create(@Body('lab') item: Lab): Promise<void> {
      this.labsService.create(item);
    }
  
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Put()
    @Permissions('create:labs')
    async update(@Body('lab') item: Lab): Promise<void> {
      this.labsService.update(item);
    }
  
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Delete(':id')
    @Permissions('delete:labs')
    async delete(@Param('id') id: number): Promise<void> {
      this.labsService.delete(id);
    }
}

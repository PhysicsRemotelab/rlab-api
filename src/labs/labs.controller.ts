import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { LabsService } from './labs.service';
  import { Lab } from './lab.entity';

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

    @Post()
    async create(@Body('item') item: Lab): Promise<void> {
      this.labsService.create(item);
    }
  
    @Put()
    async update(@Body('item') item: Lab): Promise<void> {
      this.labsService.update(item);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
      this.labsService.delete(id);
    }
}

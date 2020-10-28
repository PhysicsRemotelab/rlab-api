import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LabsService } from './labs.service';
import { LabsController } from './labs.controller';
import { Lab } from './lab.model';

@Module({
  imports: [SequelizeModule.forFeature([Lab])],
  providers: [LabsService],
  controllers: [LabsController]
})
export class LabsModule { }
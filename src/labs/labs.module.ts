import { Module } from '@nestjs/common';
import { LabsService } from './labs.service';
import { LabsController } from './labs.controller';
import { Lab } from './lab.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Lab])],
  providers: [LabsService],
  controllers: [LabsController]
})
export class LabsModule {}

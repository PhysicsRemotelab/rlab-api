import { Module } from '@nestjs/common';
import { LabsService } from './labs.service';
import { LabsController } from './labs.controller';

@Module({
  providers: [LabsService],
  controllers: [LabsController]
})
export class LabsModule {}

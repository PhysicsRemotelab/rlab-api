import { Module } from '@nestjs/common';
import { LabsService } from './labs.service';
import { LabsController } from './labs.controller';
import { LabEntity } from './lab.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([LabEntity])],
    providers: [LabsService],
    controllers: [LabsController],
    exports: [LabsService]
})
export class LabsModule {}

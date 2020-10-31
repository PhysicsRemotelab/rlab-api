import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HistoryController } from './history.controller';
import { History } from './history.model';
import { HistoryService } from './history.service';

@Module({
  imports: [SequelizeModule.forFeature([History])],
  providers: [HistoryService],
  controllers: [HistoryController]
})
export class HistoryModule { }
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { History } from './history.model';

@Injectable()
export class HistoryService {

    constructor(
        @InjectModel(History)
        private readonly historyModel: typeof History
    ) { }

    findAll(): Promise<History[]> {
        return this.historyModel.findAll();
    }

    create(historyDto: History): Promise<History> {
        return historyDto.save();
    }
}
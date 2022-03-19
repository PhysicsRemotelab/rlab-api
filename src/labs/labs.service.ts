import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LabEntity } from './lab.entity';

@Injectable()
export class LabsService {
    constructor(
        @InjectRepository(LabEntity)
        private repository: Repository<LabEntity>
    ) {}

    async findAll(): Promise<LabEntity[]> {
        const labs = await this.repository.find();
        return labs;
    }

    async findOne(code: string): Promise<LabEntity> {
        return await this.repository.findOne({ code });
    }
}

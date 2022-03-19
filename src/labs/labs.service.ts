import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lab } from './lab.model';

@Injectable()
export class LabsService {
    constructor(
        @InjectRepository(Lab)
        private repository: Repository<Lab>
    ) {}

    async findAll(): Promise<Lab[]> {
        const labs = await this.repository.find();
        return labs;
    }

    async findOne(id: number): Promise<Lab> {
        return await this.repository.findOne(id);
    }
}

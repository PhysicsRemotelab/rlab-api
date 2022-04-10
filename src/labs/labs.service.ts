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

    public async findAll(): Promise<LabEntity[]> {
        return await this.repository.find();
        /*return await this.repository.find({
            join: { alias: 'labs', leftJoinAndSelect: { bookings: 'labs.bookings' } },
            where: (qb: any) => {
                qb.where('bookings.id is null')
            }
        });*/
    }

    public async findOne(code: string): Promise<LabEntity> {
        return await this.repository.findOne({ where: { code } });
    }
}

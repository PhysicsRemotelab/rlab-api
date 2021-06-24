import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm/repository/Repository';
import { MeasurementDto } from './measurement.dto';
import { MeasurementEntity } from './measurement.entity';

@Injectable()
export class MeasurementService {

    constructor(
        @InjectRepository(MeasurementEntity)
        private readonly measurementRepository: Repository<MeasurementEntity>,
        @Inject(REQUEST)
        private request
    ) { }

    async findAll(): Promise<MeasurementEntity[]> {
        const sub = this.request.user.sub;
        const user = await this.userModel.findOne({ where: { sub } });
        return this.measurementRepository.findAll({
            where: { user_id: user.id },
            include: [{ model: User }, { model: Lab }]
        });
    }

    async create(measurementDto: MeasurementDto): Promise<MeasurementEntity> {
        const sub = this.request.user.sub;
        const user = await this.userModel.findOne({ where: { sub } });
        const measurement = new MeasurementEntity();
        measurement.result = measurementDto.result;
        measurement.name = measurementDto.name;
        measurement.labId = measurementDto.lab_id;
        measurement.userId = user.id;
        return measurement.save();
    }

    findOne(id: string): Promise<MeasurementEntity> {
        return this.measurementRepository.findOne({ where: { id } });
    }

    async remove(id: string): Promise<number> {
        const lab = await this.measurementRepository.findOne({ where: { id } });
        await lab.remove();
        return 1;
    }
}
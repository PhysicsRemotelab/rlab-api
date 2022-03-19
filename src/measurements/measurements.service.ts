import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { MeasurementDto } from './measurement.dto';
import { MeasurementEntity } from './measurements.entity';

@Injectable()
export class MeasurementService {
    constructor(
        @Inject(REQUEST)
        private request,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(MeasurementEntity)
        private measurementRepository: Repository<MeasurementEntity>
    ) {}

    async findAll(): Promise<MeasurementEntity[]> {
        const sub = this.request.user.sub;
        const user = await this.userRepository.findOne({ where: { sub: sub } });
        return await this.measurementRepository.find({
            where: { user_id: user.id }
        });
    }

    async create(measurementDto: MeasurementDto): Promise<MeasurementEntity> {
        const sub = this.request.user.sub;
        const user = await this.userRepository.findOne({ where: { sub: sub } });

        const measurement = new MeasurementEntity();
        measurement.result = measurementDto.result;
        measurement.name = measurementDto.name;
        measurement.lab_id = measurementDto.lab_id;
        measurement.user_id = user.id;
        return await measurement.save();
    }

    async remove(id: number): Promise<MeasurementEntity> {
        const model = await this.measurementRepository.findOne(id);
        return await this.measurementRepository.remove(model);
    }
}

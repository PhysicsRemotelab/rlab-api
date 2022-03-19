import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.model';
import { Repository } from 'typeorm';
import { MeasurementDto } from './measurement.dto';
import { Measurement } from './measurements.model';

@Injectable()
export class MeasurementService {
    constructor(
        @Inject(REQUEST)
        private request,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Measurement)
        private measurementRepository: Repository<Measurement>
    ) {}

    async findAll(): Promise<Measurement[]> {
        const sub = this.request.user.sub;
        const user = await this.userRepository.findOne({ where: { sub: sub } });
        return await this.measurementRepository.find({
            where: { user_id: user.id }
        });
    }

    async create(measurementDto: MeasurementDto): Promise<Measurement> {
        const sub = this.request.user.sub;
        const user = await this.userRepository.findOne({ where: { sub: sub } });
        const measurement = new Measurement();
        measurement.result = measurementDto.result;
        measurement.name = measurementDto.name;
        measurement.lab_id = measurementDto.lab_id;
        measurement.user_id = user.id;
        return await measurement.save();
    }

    async remove(id: number): Promise<Measurement> {
        const model = await this.measurementRepository.findOne(id);
        return await this.measurementRepository.remove(model);
    }
}

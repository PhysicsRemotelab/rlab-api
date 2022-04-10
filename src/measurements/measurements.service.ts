import { Inject, Injectable, StreamableFile } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/user.entity';
import { Repository } from 'typeorm';
import { MeasurementDto } from './measurement.dto';
import { MeasurementEntity } from './measurements.entity';
import { randomUUID } from 'crypto';
import { FileService } from 'src/core/file.service';
import { createReadStream } from 'fs';

@Injectable()
export class MeasurementService {
    constructor(
        @Inject(REQUEST)
        private request,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(MeasurementEntity)
        private measurementRepository: Repository<MeasurementEntity>,
        private fileService: FileService
    ) {}

    async findAll(): Promise<MeasurementEntity[]> {
        const sub = this.request.user.sub;
        const user = await this.userRepository.findOne({ where: { sub: sub } });
        return await this.measurementRepository.find({
            where: { userId: user.id }
        });
    }

    async create(measurementDto: MeasurementDto): Promise<MeasurementEntity> {
        const sub = this.request.user.sub;
        const user = await this.userRepository.findOne({ where: { sub: sub } });

        const measurement = new MeasurementEntity();
        measurement.result = measurementDto.result;
        measurement.displayName = measurementDto.displayName + '.txt';
        measurement.fileName = randomUUID() + '.txt';
        measurement.labId = measurementDto.labId;
        measurement.userId = user.id;
        return await measurement.save();
    }

    async remove(id: number): Promise<MeasurementEntity> {
        const model = await this.measurementRepository.findOne({ where: { id } });
        return await this.measurementRepository.remove(model);
    }
    
    async downloadStream(id: number): Promise<StreamableFile> {
        const measurementEntity = await this.measurementRepository.findOne({ where: { id } });
        const file = createReadStream('./data' + measurementEntity.fileName);
        return new StreamableFile(file);
    }
}

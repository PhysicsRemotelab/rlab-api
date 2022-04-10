import { Inject, Injectable, StreamableFile } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/user.entity';
import { Repository } from 'typeorm';
import { MeasurementDto } from './measurement.dto';
import { MeasurementEntity } from './measurements.entity';
import { randomUUID } from 'crypto';
import { FileService } from 'src/core/file.service';

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

    public async findAll(): Promise<MeasurementEntity[]> {
        const sub = this.request.user.sub;
        const user = await this.userRepository.findOne({ where: { sub: sub } });
        return await this.measurementRepository.find({
            where: { userId: user.id }
        });
    }

    public async create(measurementDto: MeasurementDto): Promise<MeasurementEntity> {
        const sub = this.request.user.sub;
        const user = await this.userRepository.findOne({ where: { sub: sub } });

        const measurement = new MeasurementEntity();
        measurement.result = measurementDto.result;
        measurement.displayName = measurementDto.displayName + '.txt';
        measurement.fileName = randomUUID() + '.txt';
        measurement.labId = measurementDto.labId;
        measurement.userId = user.id;

        this.fileService.writeDataFileToDisk(measurementDto.result, measurement.fileName);

        return await measurement.save();
    }

    public async remove(id: number): Promise<MeasurementEntity> {
        const model = await this.measurementRepository.findOne({ where: { id } });
        return await this.measurementRepository.remove(model);
    }

    public async downloadStream(id: number): Promise<StreamableFile> {
        const measurementEntity = await this.measurementRepository.findOne({ where: { id } });
        const file = this.fileService.createReadStream(measurementEntity.fileName);
        return new StreamableFile(file);
    }
}

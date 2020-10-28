import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/sequelize';
import { MeasurementDto } from './measurement.dto';
import { Measurement } from './measurements.model';

@Injectable()
export class MeasurementService {

    constructor(
        @InjectModel(Measurement)
        private readonly measurementModel: typeof Measurement,
        @Inject(REQUEST)
        private request
    ) { }

    findAll(): Promise<Measurement[]> {
        const email = this.request.user['https://remotelab.ee/email'];
        return this.measurementModel.findAll({ where: { email } });
    }

    create(measurementDto: MeasurementDto): Promise<Measurement> {
        const measurement = new Measurement();
        measurement.result = measurementDto.result;
        measurement.labId = measurementDto.lab_id;
        measurement.email = this.request.user['https://remotelab.ee/email'];
        return measurement.save();
    }

    async update(measurementDto: MeasurementDto): Promise<Measurement> {
        const measurement = await this.measurementModel.findOne({ where: { id: measurementDto.id } });
        measurement.result = measurementDto.result;
        return measurement.save();
    }

    findOne(id: string): Promise<Measurement> {
        return this.measurementModel.findOne({ where: { id } });
    }

    async remove(id: string): Promise<number> {
        const lab = await this.measurementModel.findOne({ where: { id } });
        await lab.destroy();
        return 1;
    }
}
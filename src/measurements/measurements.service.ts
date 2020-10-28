import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MeasurementDto } from './measurement.dto';
import { Measurement } from './measurements.model';

@Injectable()
export class MeasurementService {

    constructor(
        @InjectModel(Measurement)
        private readonly measurementModel: typeof Measurement
    ) { }

    findAll(): Promise<Measurement[]> {
        return this.measurementModel.findAll();
    }

    create(measurementDto: MeasurementDto): Promise<Measurement> {
        const measurement = new Measurement();
        measurement.result = measurementDto.result;
        measurement.labId = measurementDto.lab_id;
        measurement.email = measurementDto.email;
        return measurement.save();
    }

    async update(measurementDto: MeasurementDto): Promise<Measurement> {
        const measurement = await this.measurementModel.findOne({ where: { id: measurementDto.id } });
        measurement.result = measurementDto.result;
        measurement.labId = measurementDto.lab_id;
        measurement.email = measurementDto.email;
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
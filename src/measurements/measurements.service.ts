import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/sequelize';
import { Lab } from 'src/labs/lab.model';
import { User } from 'src/users/user.model';
import { MeasurementDto } from './measurement.dto';
import { Measurement } from './measurements.model';

@Injectable()
export class MeasurementService {

    constructor(
        @InjectModel(Measurement)
        private readonly measurementModel: typeof Measurement,
        @InjectModel(User)
        private readonly userModel: typeof User,
        @Inject(REQUEST)
        private request
    ) { }

    async findAll(): Promise<Measurement[]> {
        const email = this.request.user['https://remotelab.ee/email'];
        const user = await this.userModel.findOne({ where: { email } });
        return this.measurementModel.findAll({
            where: { user_id: user.id },
            include: [{ model: User }, { model: Lab }]
        });
    }

    async create(measurementDto: MeasurementDto): Promise<Measurement> {
        const email = this.request.user['https://remotelab.ee/email'];
        const user = await this.userModel.findOne({ where: { email } });
        const measurement = new Measurement();
        measurement.result = measurementDto.result;
        measurement.name = measurementDto.name;
        measurement.labId = measurementDto.lab_id;
        measurement.userId = user.id;
        return measurement.save();
    }

    async update(measurementDto: MeasurementDto): Promise<Measurement> {
        const measurement = await this.measurementModel.findOne({ where: { id: measurementDto.id } });
        measurement.result = measurementDto.result;
        measurement.name = measurementDto.name;
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
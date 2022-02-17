import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { User } from 'src/users/user.model';
import { EntityManager, getRepository } from 'typeorm';
import { MeasurementDto } from './measurement.dto';
import { Measurement } from './measurements.model';

@Injectable()
export class MeasurementService {
  constructor(
    @Inject(REQUEST)
    private request,
    private readonly entityManager: EntityManager
  ) {}

  async findAll(): Promise<Measurement[]> {
    const sub = this.request.user.sub;
    const user = await getRepository(User).findOne({ where: { sub: sub } });
    return await getRepository(Measurement).find({
      where: { user_id: user.id }
    });
  }

  async create(measurementDto: MeasurementDto): Promise<Measurement> {
    const sub = this.request.user.sub;
    const user = await getRepository(User).findOne({ where: { sub: sub } });
    const measurement = new Measurement();
    measurement.result = measurementDto.result;
    measurement.name = measurementDto.name;
    measurement.lab_id = measurementDto.lab_id;
    measurement.user_id = user.id;
    return await measurement.save();
  }

  async remove(id: number): Promise<Measurement> {
    return await this.entityManager.query(
      'DELETE FROM measurements WHERE id = ?',
      [id]
    );
  }
}

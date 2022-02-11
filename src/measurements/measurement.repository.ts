import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { MeasurementDto } from './measurement.dto';
import { Measurement } from './measurements.model';

@Injectable()
export class MeasurementRepository {
  constructor(private readonly entityManager: EntityManager) {}

  public async findAll(userId: number): Promise<Measurement[]> {
      return await this.entityManager.query(
        'SELECT * FROM measurements WHERE user_id = ?',
        [userId]
      );
  }

  public async create(measurementDto: MeasurementDto, userId: number): Promise<Measurement> {
    const measurement = new Measurement();
    measurement.result = measurementDto.result;
    measurement.name = measurementDto.name;
    measurement.lab_id = measurementDto.lab_id;
    measurement.user_id = userId;
    return measurement.save();
  }

  public async delete(id: number): Promise<Measurement> {
    return await this.entityManager.query(
      'DELETE FROM measurements WHERE id = ?',
      [id]
    );
  }

}

import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { UserRepository } from 'src/users/users.repository';
import { MeasurementDto } from './measurement.dto';
import { MeasurementRepository } from './measurement.repository';
import { Measurement } from './measurements.model';

@Injectable()
export class MeasurementService {
  constructor(
    @Inject(REQUEST)
    private request,
    private readonly userRepository: UserRepository,
    private readonly measurementRepository: MeasurementRepository
  ) {}

  async findAll(): Promise<Measurement[]> {
    const sub = this.request.user.sub;
    const user = await this.userRepository.findBySub(sub);
    return this.measurementRepository.findAll(user.id);
  }

  async create(measurementDto: MeasurementDto): Promise<Measurement> {
    const sub = this.request.user.sub;
    const user = await this.userRepository.findBySub(sub);
    return this.measurementRepository.create(measurementDto, user.id);
  }

  async remove(id: number): Promise<Measurement> {
    return this.measurementRepository.delete(id);
  }
}

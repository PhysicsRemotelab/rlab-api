import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Lab } from './lab.model';
import { LabRepository } from './labs.repository';

@Injectable()
export class LabsService {
  constructor(
    @Inject(REQUEST)
    private request,
    private readonly labRepository: LabRepository
  ) {}

  findAll(): Promise<Lab[]> {
    return this.labRepository.findAll();
  }

  findOne(id: number): Promise<Lab> {
    return this.labRepository.findOne(id);
  }
}

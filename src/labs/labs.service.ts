import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { Lab } from './lab.model';

@Injectable()
export class LabsService {

  async findAll(): Promise<Lab[]> {
    const labs = await getRepository(Lab).find();
    return labs;
  }

  async findOne(id: number): Promise<Lab> {
    return await getRepository(Lab).findOne(id);
  }
}

import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Lab } from './lab.model';

@Injectable()
export class LabRepository {
  constructor(private readonly entityManager: EntityManager) {}

  public async findAll(): Promise<Lab[]> {
      return await this.entityManager.query('SELECT * FROM labs');
  }

  public async findOne(id: number): Promise<Lab> {
    return await this.entityManager.query('SELECT * FROM labs WHERE id = ?', [id]);
}

}

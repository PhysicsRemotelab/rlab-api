import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { AuditDto } from './audit.dto';
import { AuditEntity } from './audit.model';

@Injectable()
export class AuditRepository {
  constructor(
    private readonly entityManager: EntityManager
  ) {}

  public async findAll(): Promise<AuditEntity[]> {
    return await this.entityManager.query('SELECT * FROM audit');
  }

  public async findOne(id: number): Promise<AuditEntity> {
    return await this.entityManager.query(
      'SELECT * FROM audit WHERE audit.id = ?',
      [id]
    );
  }

  public async create(auditDto: AuditDto): Promise<AuditEntity> {
    const audit = new AuditEntity();
    audit.type = auditDto.type;
    return audit.save();
  }
}

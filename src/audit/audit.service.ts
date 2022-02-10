import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { AuditDto } from './audit.dto';
import { AuditEntity } from './audit.model';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditEntity)
    private readonly auditRepository: Repository<AuditEntity>
  ) {}

  private entityManager = getManager();

  public async findAll(): Promise<AuditEntity[]> {
    return await this.entityManager.query('SELECT * FROM audit');
  }

  public async findOne(id: number): Promise<AuditEntity> {
    return await this.entityManager.query('SELECT * FROM audit WHERE audit.id = ?', [id]);
  }

  async create(auditDto: AuditDto): Promise<AuditEntity> {
    const audit = new AuditEntity();
    audit.type = auditDto.type;
    return audit.save();
  }
}

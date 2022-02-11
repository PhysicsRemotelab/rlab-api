import { Injectable } from '@nestjs/common';
import { AuditDto } from './audit.dto';
import { AuditEntity } from './audit.model';
import { AuditRepository } from './audit.repository';

@Injectable()
export class AuditService {
  constructor(
    private readonly auditRepository: AuditRepository
  ) {}

  public findAll(): Promise<AuditEntity[]> {
    return this.auditRepository.findAll();
  }

  public findOne(id: number): Promise<AuditEntity> {
    return this.auditRepository.findOne(id);
  }

  public create(auditDto: AuditDto): Promise<AuditEntity> {
    return this.auditRepository.create(auditDto);
  }
}

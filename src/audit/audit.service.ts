import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditDto } from './audit.dto';
import { AuditEntity } from './audit.model';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditEntity)
    private readonly auditRepository: Repository<AuditEntity>,
  ) {}

  public async findAll(): Promise<AuditEntity[]> {
    return await this.auditRepository.find();
  }

  async create(auditDto: AuditDto): Promise<AuditEntity> {
    const audit = new AuditEntity();
    audit.type = auditDto.type;
    return audit.save();
  }
}

import { Injectable } from '@nestjs/common';
import { AuditDto } from './audit.dto';
import { Audit } from './audit.model';
import { AuditRepository } from './audit.repository';

@Injectable()
export class AuditService {
    constructor(private readonly auditRepository: AuditRepository) {}

    public findAll(): Promise<Audit[]> {
        return this.auditRepository.findAll();
    }

    public findOne(id: number): Promise<Audit> {
        return this.auditRepository.findOne(id);
    }

    public create(auditDto: AuditDto): Promise<Audit> {
        return this.auditRepository.create(auditDto);
    }
}

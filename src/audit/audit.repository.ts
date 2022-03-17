import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { AuditDto } from './audit.dto';
import { Audit } from './audit.model';

@Injectable()
export class AuditRepository {
    constructor(private readonly entityManager: EntityManager) {}

    public async findAll(): Promise<Audit[]> {
        return await this.entityManager.query('SELECT * FROM audit');
    }

    public async findOne(id: number): Promise<Audit> {
        return await this.entityManager.query('SELECT * FROM audit WHERE audit.id = ?', [id]);
    }

    public async create(auditDto: AuditDto): Promise<Audit> {
        const audit = new Audit();
        audit.action = auditDto.action;
        return audit.save();
    }
}

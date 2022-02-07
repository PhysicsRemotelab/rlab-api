import {
  Body,
    Controller,
    Get,
    Post,
  } from '@nestjs/common';
import { AuditDto } from './audit.dto';
import { AuditEntity } from './audit.model';
import { AuditService } from './audit.service';
  
@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  findAll(): Promise<AuditEntity[]> {
    return this.auditService.findAll();
  }

  @Post()
  create(@Body() auditDto: AuditDto): Promise<AuditEntity> {
    return this.auditService.create(auditDto);
  }
}

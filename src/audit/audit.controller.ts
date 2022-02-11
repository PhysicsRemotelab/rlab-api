import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuditDto } from './audit.dto';
import { Audit } from './audit.model';
import { AuditService } from './audit.service';

@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  findAll(): Promise<Audit[]> {
    return this.auditService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Audit> {
    return this.auditService.findOne(id);
  }

  @Post()
  create(@Body() auditDto: AuditDto): Promise<Audit> {
    return this.auditService.create(auditDto);
  }
}

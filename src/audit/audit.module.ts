import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditController } from './audit.controller';
import { AuditEntity } from './audit.model';
import { AuditService } from './audit.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuditEntity])],
  providers: [AuditService],
  controllers: [AuditController]
})
export class AuditModule {}

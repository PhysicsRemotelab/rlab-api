import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { AuditDto } from './audit.dto';
import { Audit } from './audit.model';
import { AuditService } from './audit.service';

@Controller('audit')
export class AuditController {
    constructor(private readonly auditService: AuditService) {}

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Get()
    findAll(): Promise<Audit[]> {
        return this.auditService.findAll();
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Audit> {
        return this.auditService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Post()
    create(@Body() auditDto: AuditDto): Promise<Audit> {
        return this.auditService.create(auditDto);
    }
}

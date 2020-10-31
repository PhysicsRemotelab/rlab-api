import {  Controller, Get, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import { History } from './history.model';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('history')
export class HistoryController {

    constructor(
        private readonly historyService: HistoryService
    ) { }

    //@UseGuards(AuthGuard('jwt'), PermissionsGuard)
    //@Permissions('read:history')
    @Get()
    findAll(): Promise<History[]> {
        return this.historyService.findAll();
    }

}
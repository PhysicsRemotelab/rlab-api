import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { LabEntity } from './lab.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LabDto } from './lab.dto';
import UserEntity from 'src/users/user.entity';
import { LabUserEntity } from 'src/lab_users/lab_user.entity';

@Injectable()
export class LabsService {

    constructor(
        @InjectRepository(LabEntity)
        private readonly labRepository: Repository<LabEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(LabUserEntity)
        private readonly labUserRepository: Repository<LabUserEntity>,
        @Inject(REQUEST)
        private request
    ) { }

    public async findAll(): Promise<LabEntity[]> {
        return await this.labRepository.find();
    }

    public async findOne(id: string): Promise<LabEntity> {
        return this.labRepository.findOne({ where: [ { id }] });
    }
}

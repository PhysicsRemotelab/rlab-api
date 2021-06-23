import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { LabUser } from 'src/lab_users/lab_user.model';
import { User } from 'src/users/user.model';
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

    async useLab(labDto: LabDto): Promise<LabEntity> {
        const sub = this.request.user.sub;
        const user = await this.userRepository.findOne({ where: [ { sub }] });

        let labUserModel = await this.labUserRepository.findOne({ where: [ { lab_id: labDto.id }] });
        const lab = await this.labUserRepository.findOne({ where: [ { id: labDto.id }] });

        if(labUserModel) {
            if(labUserModel.takenUntil < new Date()) {
                await labUserModel.destroy();
                labUserModel = await this.labUserModel.findOne({ where: { lab_id: labDto.id }});
            }
        }

        if(!labUserModel) {
            const takenAt = new Date();
            const takenUntil = new Date(takenAt.getTime() + 10*60000);
            const labUser = new LabUser();
            labUser.userId = user.id;
            labUser.labId = lab.id;
            labUser.takenAt = takenAt;
            labUser.takenUntil = takenUntil;
            await labUser.save();
            return this.labModel.findOne({ where: { id: lab.id }, include: [{ model: User }] });
        }
        return lab;
    }
}
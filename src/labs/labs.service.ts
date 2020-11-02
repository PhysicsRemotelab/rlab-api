import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import { LabDto } from './lab.dto';
import { Lab } from './lab.model';

@Injectable()
export class LabsService {

    constructor(
        @InjectModel(Lab)
        private readonly labModel: typeof Lab,
        @InjectModel(User)
        private readonly userModel: typeof User,
        @Inject(REQUEST)
        private request
    ) { }

    findAll(): Promise<Lab[]> {
        return this.labModel.findAll();
    }

    create(labDto: LabDto): Promise<Lab> {
        const lab = new Lab();
        lab.name = labDto.name;
        lab.description = labDto.description;
        lab.image = labDto.image;
        return lab.save();
    }

    async remove(id: string): Promise<number> {
        const lab = await this.labModel.findOne({ where: { id } });
        await lab.destroy();
        return 1;
    }

    async update(labDto: LabDto): Promise<Lab> {
        const lab = await this.labModel.findOne({ where: { id: labDto.id } });
        lab.name = labDto.name;
        lab.description = labDto.description;
        lab.image = labDto.image;
        return lab.save();
    }

    findOne(id: string): Promise<Lab> {
        return this.labModel.findOne({ where: { id } });
    }

    async useLab(labDto: LabDto): Promise<Lab | 0> {
        const lab = await this.labModel.findOne({ where: { id: labDto.id } });
        if(lab.userId === null) {
            const email = this.request.user['https://remotelab.ee/email'];
            const user = await this.userModel.findOne({ where: { email } });
            lab.userId = user.id;
            return lab.save();
        }
        return 0;
    }

    async freeLab(labDto: LabDto): Promise<Lab | 0> {
        const lab = await this.labModel.findOne({ where: { id: labDto.id } });
        const email = this.request.user['https://remotelab.ee/email'];
        const user = await this.userModel.findOne({ where: { email } });
        if(lab.userId === user.id) {
            lab.userId = null;
            return lab.save();
        }
        return 0;
    }
}
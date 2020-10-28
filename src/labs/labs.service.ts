import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LabDto } from './lab.dto';
import { Lab } from './lab.model';

@Injectable()
export class LabsService {

    constructor(
        @InjectModel(Lab)
        private readonly labModel: typeof Lab
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
}
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/sequelize';
import { LabUser } from 'src/lab_users/lab_user.model';
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
    @InjectModel(LabUser)
    private readonly labUserModel: typeof LabUser,
    @Inject(REQUEST)
    private request
  ) {}

  findAll(): Promise<Lab[]> {
    return this.labModel.findAll({ include: [{ model: User }] });
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
    return this.labModel.findOne({ where: { id }, include: [{ model: User }] });
  }

  async useLab(labDto: LabDto): Promise<Lab> {
    const sub = this.request.user.sub;
    const user = await this.userModel.findOne({ where: { sub } });
    let labUserModel = await this.labUserModel.findOne({
      where: { lab_id: labDto.id }
    });
    const lab = await this.labModel.findOne({
      where: { id: labDto.id },
      include: [{ model: User }]
    });

    if (labUserModel) {
      if (labUserModel.takenUntil < new Date()) {
        await labUserModel.destroy();
        labUserModel = await this.labUserModel.findOne({
          where: { lab_id: labDto.id }
        });
      }
    }

    if (!labUserModel) {
      const takenAt = new Date();
      const takenUntil = new Date(takenAt.getTime() + 10 * 60000);
      const labUser = new LabUser();
      labUser.userId = user.id;
      labUser.labId = lab.id;
      labUser.takenAt = takenAt;
      labUser.takenUntil = takenUntil;
      await labUser.save();
      return this.labModel.findOne({
        where: { id: lab.id },
        include: [{ model: User }]
      });
    }
    return lab;
  }

  async freeLab(labDto: LabDto): Promise<Lab> {
    const sub = this.request.user.sub;
    const user = await this.userModel.findOne({ where: { sub } });
    const labUserModel = await this.labUserModel.findOne({
      where: { user_id: user.id, lab_id: labDto.id }
    });

    if (labUserModel) {
      await labUserModel.destroy();
      return this.labModel.findOne({
        where: { id: labUserModel.labId },
        include: [{ model: User }]
      });
    }

    const lab = await this.labModel.findOne({
      where: { id: labDto.id },
      include: [{ model: User }]
    });
    return lab;
  }
}

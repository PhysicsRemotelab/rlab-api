import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LabsService } from './labs.service';
import { LabsController } from './labs.controller';
import { Lab } from './lab.model';
import { User } from 'src/users/user.model';
import { LabUser } from 'src/lab_users/lab_user.model';

@Module({
  imports: [SequelizeModule.forFeature([Lab, User, LabUser])],
  providers: [LabsService],
  controllers: [LabsController]
})
export class LabsModule { }
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LabUser } from './lab_user.model';

@Module({
  imports: [SequelizeModule.forFeature([LabUser])],
  providers: [],
  controllers: [],
})
export class LabUsersModule { }
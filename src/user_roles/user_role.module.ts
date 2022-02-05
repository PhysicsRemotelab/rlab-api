import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRole } from './user_role.model';

@Module({
  imports: [SequelizeModule.forFeature([UserRole])],
  providers: [],
  controllers: []
})
export class UserRolesModule {}

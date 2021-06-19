import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.model';
import { Role } from 'src/roles/role.model';
import { UserRole } from 'src/user_roles/user_role.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Role, UserRole])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule { }

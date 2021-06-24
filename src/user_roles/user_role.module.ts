import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { UserRoleEntity } from './user_role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoleEntity])],
  providers: [],
  controllers: [],
})
export class UserRolesModule { }

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { RoleEntity } from './role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  providers: [],
  controllers: [],
})
export class RolesModule { }

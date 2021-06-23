import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { LabUserEntity } from './lab_user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LabUserEntity])],
  providers: [],
  controllers: [],
})
export class LabUsersModule { }

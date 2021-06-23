import { Module } from '@nestjs/common';
import { LabsService } from './labs.service';
import { LabsController } from './labs.controller';
import { LabEntity } from './lab.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import UserEntity from 'src/users/user.entity';
import { LabUserEntity } from 'src/lab_users/lab_user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LabEntity, UserEntity, LabUserEntity])],
  providers: [LabsService],
  controllers: [LabsController]
})
export class LabsModule { }

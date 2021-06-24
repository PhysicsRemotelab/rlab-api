import { Module } from '@nestjs/common';
import { LabsModule } from './labs/labs.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabEntity } from './labs/lab.entity';
import { ConfigModule } from '@nestjs/config';
import UserEntity from './users/user.entity';
import { MeasurementEntity } from './measurements/measurement.entity';
import { LabUserEntity } from './lab_users/lab_user.entity';
import { RoleEntity } from './roles/role.entity';
import { UserRoleEntity } from './user_roles/user_role.entity';
import { MeasurementsModule } from './measurements/measurements.module';
import { RolesModule } from './roles/roles.module';
import { UserRolesModule } from './user_roles/user_role.module';
import { LabUsersModule } from './lab_users/lab_user.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [
          LabEntity,
          UserEntity,
          MeasurementEntity,
          LabUserEntity,
          RoleEntity, 
          UserRoleEntity
        ],
        synchronize: true
      })
    }),
    CoreModule,
    AuthModule,
    LabsModule,
    MeasurementsModule,
    RolesModule,
    UserRolesModule,
    LabUsersModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LabsModule } from './labs/labs.module';
import { UsersModule } from './users/users.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { MeasurementsModule } from './measurements/measurements.module';
import { RolesModule } from './roles/roles.module';
import { UserRolesModule } from './user_roles/user_role.module';
import { LabUsersModule } from './lab_users/lab_user.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true
    }),
    CoreModule,
    AuthModule,
    LabsModule,
    MeasurementsModule,
    UsersModule,
    RolesModule,
    UserRolesModule,
    LabUsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}

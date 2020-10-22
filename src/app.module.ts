import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LabsModule } from './labs/labs.module';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'strongpassword',
      database: 'remotelabdb',
      autoLoadModels: true,
      synchronize: true
    }),
    CoreModule,
    LabsModule,
    ItemsModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {

}

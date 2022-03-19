import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { BookingController } from './booking.controller';
import { BookingEntity } from './booking.entity';
import { BookingService } from './booking.service';

@Module({
    imports: [TypeOrmModule.forFeature([BookingEntity, UserEntity])],
    providers: [BookingService],
    controllers: [BookingController],
    exports: [BookingService]
})
export class BookingModule {}

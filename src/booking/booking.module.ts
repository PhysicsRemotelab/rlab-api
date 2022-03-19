import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lab } from 'src/labs/lab.model';
import { User } from 'src/users/user.model';
import { BookingController } from './booking.controller';
import { Booking } from './booking.model';
import { BookingService } from './booking.service';

@Module({
    imports: [TypeOrmModule.forFeature([Booking, User, Lab])],
    providers: [BookingService],
    controllers: [BookingController],
    exports: [BookingService]
})
export class BookingModule {}

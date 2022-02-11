import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/users.repository';
import { Booking } from './booking.model';
import { BookingRepository } from './booking.repository';
import { BookingService } from './booking.service';

@Module({
  imports: [TypeOrmModule.forFeature([Booking])],
  providers: [BookingService, BookingRepository, UserRepository],
  controllers: []
})
export class BookingModule {}

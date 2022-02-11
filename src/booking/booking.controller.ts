import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BookingDto } from './booking.dto';
import { Booking } from './booking.model';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  findOne(@Query('user_id') userId: number, @Query('lab_id') labId: number): Promise<Booking> {
    return this.bookingService.getBooking(userId, labId);
  }

  @Post()
  create(@Body() bookingDto: BookingDto): Promise<Booking> {
    return this.bookingService.create(bookingDto);
  }
}

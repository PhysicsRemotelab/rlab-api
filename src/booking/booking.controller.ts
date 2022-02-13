import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { BookingDto } from './booking.dto';
import { Booking } from './booking.model';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get()
  findOne(
    @Query('user_id') userId: number,
    @Query('lab_id') labId: number
  ): Promise<Booking> {
    return this.bookingService.getBooking(userId, labId);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Post()
  create(@Body() bookingDto: BookingDto): Promise<Booking> {
    return this.bookingService.create(bookingDto);
  }
}

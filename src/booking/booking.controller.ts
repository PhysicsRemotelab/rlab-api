import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { Lab } from 'src/labs/lab.model';
import { BookingDto } from './booking.dto';
import { Booking } from './booking.model';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Post()
  create(@Body() bookingDto: BookingDto): Promise<Lab | string> {
    return this.bookingService.create(bookingDto);
  }

  @Get(':id')
  check(@Param('id') labId: number): Promise<Booking> {
    return this.bookingService.getLabBooking(labId);
  }
}

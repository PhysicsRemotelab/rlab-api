import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { BookingDto } from './booking.dto';
import { BookingEntity } from './booking.entity';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService) {}

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Post()
    create(@Body() bookingDto: BookingDto): Promise<BookingEntity | null> {
        return this.bookingService.create(bookingDto);
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Get(':id')
    check(@Param('id') labId: number): Promise<BookingEntity | object> {
        return this.bookingService.getLabBooking(labId);
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Get('cancel/:id')
    cancel(@Param('id') bookingId: number): Promise<BookingEntity> {
        return this.bookingService.cancelLabBooking(bookingId);
    }
}

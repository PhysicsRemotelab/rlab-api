import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { BookingDto } from './booking.dto';
import { BookingEntity } from './booking.entity';
import { BookingService } from './booking.service';

@ApiTags('Booking')
@Controller('api/v1/booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService) {}

    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({
        status: 200,
        description: 'Create booking',
        type: BookingEntity
    })
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Post()
    create(@Body() bookingDto: BookingDto): Promise<BookingEntity | null> {
        return this.bookingService.create(bookingDto);
    }

    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({
        status: 200,
        description: 'Check booking',
        type: BookingEntity
    })
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Get(':id')
    check(@Param('id') labId: number): Promise<BookingEntity | object> {
        return this.bookingService.getLabBooking(labId);
    }

    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({
        status: 200,
        description: 'Cancel booking',
        type: BookingEntity
    })
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Get('cancel/:id')
    cancel(@Param('id') bookingId: number): Promise<BookingEntity> {
        return this.bookingService.cancelLabBooking(bookingId);
    }
}

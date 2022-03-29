import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { BadRequest, Unauthorized } from 'src/core/swagger.annotations';
import { BookingDto } from './booking.dto';
import { BookingEntity } from './booking.entity';
import { BookingService } from './booking.service';

@ApiResponse(BadRequest)
@ApiResponse(Unauthorized)
@ApiTags('Booking')
@Controller('api/v1/booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService) {}

    @ApiResponse({
        status: 201,
        description: 'Created',
        type: BookingEntity
    })
    @ApiOperation({
        summary: 'Create booking'
    })
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Post()
    create(@Body() bookingDto: BookingDto): Promise<BookingEntity | null> {
        return this.bookingService.create(bookingDto);
    }

    @ApiResponse({
        status: 200,
        description: 'OK',
        type: BookingEntity
    })
    @ApiOperation({
        summary: 'Get booking'
    })
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Get(':id')
    check(@Param('id') labId: number): Promise<BookingEntity | object> {
        return this.bookingService.getLabBooking(labId);
    }

    @ApiResponse({
        status: 200,
        description: 'OK',
        type: BookingEntity
    })
    @ApiOperation({
        summary: 'Cancel booking'
    })
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Get('cancel/:id')
    cancel(@Param('id') bookingId: number): Promise<BookingEntity> {
        return this.bookingService.cancelLabBooking(bookingId);
    }
}

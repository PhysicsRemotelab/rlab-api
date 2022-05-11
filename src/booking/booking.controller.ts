import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequest, Unauthorized } from '../core/swagger.annotations';
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
    @UseGuards(AuthGuard('jwt'))
    @Post()
    public create(@Body() bookingDto: BookingDto): Promise<BookingEntity | null> {
        return this.bookingService.create(bookingDto);
    }

    @ApiResponse({
        status: 200,
        description: 'OK',
        type: BookingEntity
    })
    @ApiOperation({
        summary: 'Check booking'
    })
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    public check(@Param('id') labId: number): Promise<BookingEntity | object> {
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
    @UseGuards(AuthGuard('jwt'))
    @Get('cancel/:id')
    public cancel(@Param('id') bookingId: number): Promise<BookingEntity> {
        return this.bookingService.cancelLabBooking(bookingId);
    }

    @ApiResponse({
        status: 200,
        description: 'OK',
        type: BookingEntity
    })
    @ApiOperation({
        summary: 'Get user bookings list'
    })
    @UseGuards(AuthGuard('jwt'))
    @Get()
    public findAll(): Promise<BookingEntity[]> {
        return this.bookingService.findAll();
    }

    @ApiResponse({
        status: 200,
        description: 'OK',
        type: BookingEntity
    })
    @ApiOperation({
        summary: 'Delete booking'
    })
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    public remove(@Param('id') id: number): Promise<BookingEntity> {
        return this.bookingService.remove(id);
    }

    @ApiResponse({
        status: 200,
        description: 'OK',
        type: BookingEntity
    })
    @ApiOperation({
        summary: 'Get taken days by lab id'
    })
    @UseGuards(AuthGuard('jwt'))
    @Get('taken_days/:labId')
    public getTakenDays(@Param('labId') labId: number): Promise<BookingEntity[]> {
        return this.bookingService.getTakenDays(labId);
    }
}

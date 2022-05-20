import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingService } from 'src/booking/booking.service';
import { Repository } from 'typeorm';
import { LabEntity } from './lab.entity';

@Injectable()
export class LabsService {
    constructor(
        @InjectRepository(LabEntity)
        private readonly repository: Repository<LabEntity>,
        private readonly bookingService: BookingService
    ) {}

    public async findAll(): Promise<LabEntity[]> {
        const labs = await this.repository.find();
        for (let i = 0; i < labs.length; i++) {
            const booking = await this.bookingService.getLabBooking(labs[i].id);
            if (booking) {
                labs[i].bookings = [booking];
            }
        }
        return labs;
    }

    public async findOne(code: string): Promise<LabEntity> {
        return await this.repository.findOne({ where: { code } });
    }
}

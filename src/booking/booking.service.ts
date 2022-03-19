import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { UserEntity } from 'src/users/user.entity';
import { BookingDto } from './booking.dto';
import { BookingEntity } from './booking.entity';
import { LessThan, MoreThan, Not, Repository } from 'typeorm';
import { LabEntity } from 'src/labs/lab.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(BookingEntity)
        private bookingRepository: Repository<BookingEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(LabEntity)
        private labRepository: Repository<LabEntity>,
        @Inject(REQUEST)
        private request
    ) {}

    public async create(bookingDto: BookingDto): Promise<LabEntity | string> {
        const sub = this.request.user.sub;
        const user = await this.userRepository.findOne({ where: { sub: sub } });

        const isAvailable = await this.isLabAvailable(bookingDto.lab_id, user.id);
        if (!isAvailable) {
            return 'Not available';
        }

        let booking = new BookingEntity();
        booking.lab_id = bookingDto.lab_id;
        booking.user_id = user.id;
        booking.is_cancelled = false;
        booking.taken_from = new Date();
        booking.taken_until = new Date(new Date().getTime() + 60 * 60 * 1000);
        booking = await booking.save();

        return await this.labRepository.findOne(bookingDto.lab_id);
    }

    public async getLabBooking(labId: number): Promise<BookingEntity> {
        const booking = await this.bookingRepository.findOne({
            where: {
                lab_id: labId,
                taken_until: MoreThan(new Date()),
                is_cancelled: 0
            }
        });
        return booking;
    }

    private async isLabAvailable(labId: number, userId: number): Promise<boolean> {
        const labs = await this.bookingRepository.find({
            where: {
                lab_id: labId,
                user_id: Not(userId),
                taken_until: LessThan(new Date()),
                is_cancelled: false
            }
        });
        return labs.length === 0;
    }

    public async cancelLabBooking(labId: number): Promise<void> {
        const sub = this.request.user.sub;
        const user = await this.userRepository.findOne({ where: { sub: sub } });

        const booking = await this.bookingRepository.findOne({
            user_id: user.id,
            lab_id: labId,
            is_cancelled: false
        });
        booking.is_cancelled = true;
        await this.bookingRepository.save(booking);

        return;
    }
}

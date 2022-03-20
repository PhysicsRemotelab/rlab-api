import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { UserEntity } from 'src/users/user.entity';
import { BookingDto } from './booking.dto';
import { BookingEntity } from './booking.entity';
import { MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookingService {
    constructor(
        @Inject(REQUEST)
        private request,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(BookingEntity)
        private bookingRepository: Repository<BookingEntity>
    ) {}

    public async create(bookingDto: BookingDto): Promise<BookingEntity | null> {
        const sub = this.request.user.sub;
        const user = await this.userRepository.findOne({ where: { sub: sub } });

        let booking = await this.bookingRepository.findOne({
            where: {
                labId: bookingDto.lab_id,
                userId: user.id,
                isCancelled: false
            }
        });

        if (booking) {
            return booking;
        }

        booking = new BookingEntity();
        booking.labId = bookingDto.lab_id;
        booking.userId = user.id;
        booking.isCancelled = false;
        booking.takenFrom = new Date();
        booking.takenUntil = new Date(new Date().getTime() + 60 * 60 * 1000);
        booking = await booking.save();
        return await this.bookingRepository.findOne({ where: { id: booking.id } });
    }

    public async getLabBooking(labId: number): Promise<BookingEntity | object> {
        const booking = await this.bookingRepository.findOne({
            where: {
                labId: labId,
                takenUntil: MoreThan(new Date()),
                isCancelled: false
            }
        });
        return booking;
    }

    public async cancelLabBooking(bookingId: number): Promise<BookingEntity> {
        const sub = this.request.user.sub;
        const user = await this.userRepository.findOne({ where: { sub: sub } });

        const booking = await this.bookingRepository.findOne({ where: { id: bookingId, userId: user.id } });
        booking.isCancelled = true;
        return await this.bookingRepository.save(booking);
    }
}

import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { UserEntity } from '../users/user.entity';
import { BookingDto } from './booking.dto';
import { BookingEntity } from './booking.entity';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';

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
                takenFrom: LessThan(new Date()),
                takenUntil: MoreThan(new Date()),
                isCancelled: 0
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
        booking.token = randomUUID();
        booking = await booking.save();
        return await this.bookingRepository.findOne({ where: { id: booking.id } });
    }

    public async getLabBooking(labId: number): Promise<BookingEntity | object> {
        const booking = await this.bookingRepository.findOne({
            where: {
                labId: labId,
                takenFrom: LessThan(new Date()),
                takenUntil: MoreThan(new Date()),
                isCancelled: 0
            },
            relations: ['user', 'lab']
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

    public async findAll(): Promise<BookingEntity[]> {
        const sub = this.request.user.sub;
        const user = await this.userRepository.findOne({ where: { sub: sub } });

        return await this.bookingRepository.find({ where: { userId: user.id } });
    }

    public async remove(id: number): Promise<BookingEntity> {
        const sub = this.request.user.sub;
        const user = await this.userRepository.findOne({ where: { sub: sub } });

        const model = await this.bookingRepository.findOne({ where: { id, userId: user.id } });
        return await this.bookingRepository.remove(model);
    }

    public async getTakenDays(labId: number): Promise<BookingEntity[]> {
        const bookings = await this.bookingRepository.find({
            where: {
                labId: labId,
                takenUntil: MoreThan(new Date()),
                isCancelled: 0
            }
        });
        return bookings;
    }
}

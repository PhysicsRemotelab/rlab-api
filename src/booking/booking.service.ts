import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { UserEntity } from '../users/user.entity';
import { BookingDto } from './booking.dto';
import { BookingEntity } from './booking.entity';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import * as moment from 'moment';

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

        const bookDate = new Date(bookingDto.book_date);
        bookDate.setTime(bookDate.getTime() + 3 * 60 * 60 * 1000);
        console.log(bookDate);

        let booking = await this.bookingRepository.findOne({
            where: {
                labId: bookingDto.lab_id,
                takenFrom: LessThan(bookDate),
                takenUntil: MoreThan(bookDate),
                isCancelled: false
            }
        });

        if (booking) {
            console.log('taken');
            return booking;
        }

        console.log('not taken');

        let takenFrom = new Date();
        let takenUntil = new Date(takenFrom.getFullYear(), takenFrom.getMonth(), takenFrom.getDate(), 23, 59, 59);
        if (bookingDto.book_date) {
            takenFrom = new Date(bookingDto.book_date);
            takenUntil = new Date(takenFrom.getFullYear(), takenFrom.getMonth(), takenFrom.getDate(), 23, 59, 59);
        }

        booking = new BookingEntity();
        booking.labId = bookingDto.lab_id;
        booking.userId = user.id;
        booking.isCancelled = false;
        booking.takenFrom = takenFrom;
        booking.takenUntil = takenUntil;
        booking.token = randomUUID();
        booking = await booking.save();
        return await this.bookingRepository.findOne({ where: { id: booking.id } });
    }

    public async getLabBooking(labId: number): Promise<BookingEntity> {
        const today = new Date();
        today.setTime(today.getTime() + 3 * 60 * 60 * 1000);

        const booking = await this.bookingRepository.findOne({
            where: {
                labId: labId,
                takenFrom: LessThan(today),
                takenUntil: MoreThan(today),
                isCancelled: false
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

        return await this.bookingRepository.find({ where: { userId: user.id }, order: { id: 'DESC' } });
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
                isCancelled: false
            }
        });
        console.log(bookings);
        const arr = bookings.map((elem: BookingEntity) => {
            const el = elem as any;
            el.takenUntil = moment(elem.takenUntil.setHours(0, 0, 0, 0)).format('YYYY-MM-DD');
            return el;
        });
        return arr;
    }
}

import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { User } from 'src/users/user.model';
import { BookingDto } from './booking.dto';
import { Booking } from './booking.model';
import { getRepository, MoreThan, Not } from 'typeorm';
import { Lab } from 'src/labs/lab.model';

@Injectable()
export class BookingService {
  constructor(
    @Inject(REQUEST)
    private request
  ) {}

  public async create(bookingDto: BookingDto): Promise<Lab | string> {
    const isAvailable = await this.isLabAvailable(bookingDto.lab_id);
    if (!isAvailable) {
      return 'Not available';
    }

    const sub = this.request.user.sub;
    const user = await getRepository(User).findOne({ where: { sub: sub } });

    let booking = new Booking();
    booking.lab_id = bookingDto.lab_id;
    booking.user_id = user.id;
    booking.is_cancelled = false;
    booking.taken_at = new Date();
    booking.taken_until = new Date(new Date().getTime() + 60 * 60 * 1000);

    booking = await booking.save();

    const lab = await getRepository(Lab).findOne(bookingDto.lab_id);

    return lab;
  }

  public async getLabBooking(labId: number): Promise<Booking> {
    const booking = await getRepository(Booking).findOne({
      where: {
        lab_id: labId,
        taken_until: MoreThan(new Date()),
        is_cancelled: 0
      }
    });
    return booking;
  }

  private async isLabAvailable(labId: number): Promise<boolean> {
    const sub = this.request.user.sub;
    const user = await getRepository(User).findOne({ where: { sub: sub } });
    const labs = await getRepository(Booking).find({
      where: {
        lab_id: labId,
        user_id: Not(user.id),
        taken_until: MoreThan(new Date()),
        is_cancelled: 0
      }
    });
    return labs.length === 0;
  }
}

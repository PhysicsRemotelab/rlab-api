import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { BookingDto } from './booking.dto';
import { Booking } from './booking.model';

@Injectable()
export class BookingRepository {
  constructor(private readonly entityManager: EntityManager) {}

  public async create(
    bookingDto: BookingDto,
    userId: number
  ): Promise<Booking> {
    const booking = new Booking();
    booking.lab_id = bookingDto.lab_id;
    booking.user_id = userId;
    booking.is_cancelled = false;
    return booking.save();
  }

  public async getBooking(userId: number, labId: number): Promise<Booking> {
    return await this.entityManager.query(
      'SELECT * FROM booking WHERE lab_id = ? AND user_id = ? AND is_cancelled = 0',
      [labId, userId]
    );
  }
}

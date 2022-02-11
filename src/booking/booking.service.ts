import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { UserRepository } from 'src/users/users.repository';
import { BookingDto } from './booking.dto';
import { Booking } from './booking.model';
import { BookingRepository } from './booking.repository';

@Injectable()
export class BookingService {
  constructor(
    @Inject(REQUEST)
    private request,
    private readonly bookingRepository: BookingRepository,
    private readonly userRepository: UserRepository
  ) {}

  public getBooking(userId: number, labId: number): Promise<Booking> {
    return this.bookingRepository.getBooking(userId, labId);
  }

  public async create(bookingDto: BookingDto): Promise<Booking> {
    const sub = this.request.user.sub;
    const user = await this.userRepository.findBySub(sub);
    return this.bookingRepository.create(bookingDto, user.id);
  }
}

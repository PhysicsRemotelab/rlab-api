import { IsNumber } from 'class-validator';

export class BookingDto {
    @IsNumber()
    lab_id: number;
}

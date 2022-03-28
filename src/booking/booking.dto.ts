import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class BookingDto {
    @ApiProperty()
    @IsNumber()
    lab_id: number;
}

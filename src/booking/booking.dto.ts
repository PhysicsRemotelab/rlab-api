import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class BookingDto {
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    lab_id: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    token: string;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    book_date: Date;
}

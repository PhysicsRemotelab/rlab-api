import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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
    @IsString()
    @IsOptional()
    book_date: Date;
}

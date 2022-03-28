import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class MeasurementDto {
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsNumber()
    lab_id: number;

    @ApiProperty()
    @IsString()
    result: string;

    @ApiProperty()
    @IsString()
    name: string;
}

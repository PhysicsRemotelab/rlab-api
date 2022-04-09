import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class MeasurementDto {
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsNumber()
    labId: number;

    @ApiProperty()
    @IsString()
    result: string;

    @ApiProperty()
    @IsString()
    displayName: string;
}

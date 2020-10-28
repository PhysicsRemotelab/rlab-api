import { IsString, IsNumber, IsOptional } from 'class-validator';

export class MeasurementDto {
    @IsNumber()
    @IsOptional()
    id?: number;

    @IsNumber()
    lab_id: number;

    @IsString()
    @IsOptional()
    result?: string;

    @IsString()
    @IsOptional()
    email?: string;
}
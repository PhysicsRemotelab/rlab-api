import { IsString, IsNumber, IsOptional } from 'class-validator';

export class MeasurementDto {
    @IsOptional()
    @IsNumber()
    id: number;

    @IsNumber()
    lab_id: number;

    @IsString()
    result: string;

    @IsString()
    name: string;
}

import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UserDto {
    @IsNumber()
    @IsOptional()
    id?: number;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    sub?: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    nickname?: string;

    @IsString()
    @IsOptional()
    picture?: string;
}

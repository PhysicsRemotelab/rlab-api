import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UserDto {
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id?: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    code?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    sub?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    email?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    nickname?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    picture?: string;
}

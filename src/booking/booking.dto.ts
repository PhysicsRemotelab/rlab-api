import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class BookingDto {
  @IsNumber()
  lab_id: number;

  @IsNumber()
  user_id: number;

  @IsBoolean()
  is_cancelled: boolean;

  @IsString()
  taken_at: Date;

  @IsString()
  taken_until: Date;
}

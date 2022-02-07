import { IsString } from 'class-validator';

export class AuditDto {
  @IsString()
  type: string;
}

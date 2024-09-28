import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { RentSize } from '../enum/rentSize.enum';
import { RentStatus } from '../enum/rentStatus.enum';

export class RentUpdateDto {
  @IsOptional()
  @IsUUID()
  lockerId?: string;

  @IsOptional()
  weight?: number;

  @IsOptional()
  @IsEnum(RentSize)
  size?: RentSize;

  @IsOptional()
  @IsEnum(RentStatus)
  status?: RentStatus;
}

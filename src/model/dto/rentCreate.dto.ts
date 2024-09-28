import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { RentSize } from '../enum/rentSize.enum';
import { RentStatus } from '../enum/rentStatus.enum';

export class RentCreateDto {
  @IsOptional()
  @IsUUID()
  lockerId?: string;

  @IsNotEmpty()
  weight: number;

  @IsNotEmpty()
  @IsEnum(RentSize)
  size: RentSize;

  @IsNotEmpty()
  @IsEnum(RentStatus)
  status: RentStatus;
}

import { IsOptional } from "class-validator";

export class BloqUpdateDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  address?: string;
}

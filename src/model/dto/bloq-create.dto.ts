import { IsNotEmpty } from "class-validator";

export class BloqCreateDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  address: string;
}

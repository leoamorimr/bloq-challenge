import { IsNotEmpty } from "class-validator";

export class BloqRequestDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  address: string;
}

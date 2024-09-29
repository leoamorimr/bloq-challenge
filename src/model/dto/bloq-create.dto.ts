import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class BloqCreateDto {
  @ApiProperty({
    description: "Title of the bloq",
    example: "My Bloq Title",
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: "Address of the bloq",
    example: "1234 Bloq Street",
  })
  @IsNotEmpty()
  address: string;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class BloqUpdateDto {
  @ApiProperty({
    description: "Title of the bloq",
    example: "Updated Bloq Title",
    required: false,
  })
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: "Address of the bloq",
    example: "Updated Bloq Street",
    required: false,
  })
  @IsOptional()
  address?: string;
}

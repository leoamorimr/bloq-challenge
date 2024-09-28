import { BloqRequestDto } from "src/model/dto/bloq-create.dto";
import { BloqResponseDto } from "src/model/dto/bloq-response.dto";
import { BloqUpdateDto } from "src/model/dto/bloq-update.dto";

export const fakeBloqRequestDto: BloqRequestDto | BloqUpdateDto = {
  title: "Any title",
  address: "Any address",
};

export const fakeBloqResponseDto: BloqResponseDto = {
  id: "Any-uuid",
  title: "Any title",
  address: "Any address",
};

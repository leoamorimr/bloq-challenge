import { BloqCreateDto } from "src/model/dto/bloq-create.dto";
import { BloqResponseDto } from "src/model/dto/bloq-response.dto";
import { BloqUpdateDto } from "src/model/dto/bloq-update.dto";
import { BloqEntity } from "../../src/model/entity/bloq.entity";

export const fakeBloqRequestDto: BloqCreateDto | BloqUpdateDto = {
  title: "Any title",
  address: "Any address",
};

export const fakeBloqResponseDto: BloqResponseDto = {
  id: "Any-uuid",
  title: "Any title",
  address: "Any address",
};

export const fakeBloqEntity: BloqEntity = {
  id: "Any-uuid",
  title: "Any title",
  address: "Any address",
};

import {
  ArgumentMetadata,
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
  PipeTransform,
} from "@nestjs/common";
import { UUID } from "node:crypto";
import { UuidTool } from "uuid-tool";

class ParseUUIDPipe implements PipeTransform<string, UUID> {
  transform(value: string, metadata: ArgumentMetadata): UUID {
    if (!UuidTool.isUuid(value)) {
      throw new BadRequestException("Invalid UUID format");
    }
    return value as UUID;
  }
}

export const isUUId = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const uuid = request.params[data];
    const pipe = new ParseUUIDPipe();
    return pipe.transform(uuid, { type: "param" });
  },
);

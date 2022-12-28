import { applyDecorators } from "@nestjs/common";
import { HttpHeaders } from "../enums/http-headers.enum";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { RequiredAdmin } from "../../auth/decorators/auth-role.decorator";

export function AdminApi(apiOperation: {
  summary: string,
  description?: string,
}) {
  return applyDecorators(
    ApiBearerAuth(HttpHeaders.AUTHORIZATION),
    RequiredAdmin(),
    ApiOperation(apiOperation)
  )
}
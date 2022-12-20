import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { REQUIRED_ADMIN } from "../decorators/auth-role.decorator";

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredAdmin = this.reflector.get<boolean>(REQUIRED_ADMIN, context.getHandler());

    if (!requiredAdmin) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      return false;
    }
    return user.isAdmin === requiredAdmin;
  }
}
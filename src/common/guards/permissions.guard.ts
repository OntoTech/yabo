import { PERMISIONS } from '@common/@types';
import { Permissions } from '@common/decorators';
import { HelperUtils } from '@common/helpers';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get(
      Permissions,
      context.getHandler(),
    );
    if (!requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user } = request;

    const hasAdminRole = user.isAdmin;
    const hasManagerRole = user.isManager;
    const userRoles = user.roles;

    const hasRequiredPermission =
      (requiredPermissions.includes(PERMISIONS.ADMIN) && hasAdminRole) ||
      (requiredPermissions.includes(PERMISIONS.MANAGER) &&
        (hasAdminRole || hasManagerRole)) ||
      HelperUtils.arraysIntersect(requiredPermissions, userRoles);

    if (hasRequiredPermission) {
      return true;
    }

    throw new ForbiddenException(
      `User must have one of the roles to use this endpoint: ${requiredPermissions.join(', ')}`,
    );
  }
}

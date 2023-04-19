import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorator/rol-protected.decorator';
import { JwtInfo } from '../interfaces/jwtinfo.type';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('UserRoleGuard');
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler()
    );

    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    const request: Express.Request = context.switchToHttp().getRequest();
    const user = request.user as JwtInfo;

    if (!user) throw new BadRequestException('User not found');

    if (validRoles.includes(user.role)) {
      return true;
    }

    throw new UnauthorizedException('User not authorized');
  }
}

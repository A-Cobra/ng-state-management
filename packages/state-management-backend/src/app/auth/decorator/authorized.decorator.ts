import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { UserRoleGuard } from '../guard/user-role.guard';
import { ValidRoles } from '../interfaces/valid-roles.type';
import { RoleProtected } from './rol-protected.decorator';

export const Authorized = (...roles: ValidRoles[]) => {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(JwtAuthGuard, UserRoleGuard)
  );
};

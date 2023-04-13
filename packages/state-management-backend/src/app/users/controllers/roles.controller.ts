import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { RolesService } from '../services/role.service';
import { Authorized } from '../../auth/decorator/authorized.decorator';
import { ValidRoles } from '../../auth/interfaces/valid-roles.type';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@Controller({
  path: 'roles',
  version: '1',
})
export class RoleController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Authorized(ValidRoles.admin)
  createRole(@Body() dto: CreateRoleDto) {
    return this.rolesService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getRoles() {
    return this.rolesService.get();
  }

  @Put(':roleId')
  @Authorized(ValidRoles.admin)
  changeRole(@Param('roleId') roleId: string, @Body() dto: CreateRoleDto) {
    return this.rolesService.modify(roleId, dto);
  }

  @Delete(':roleId')
  @Authorized(ValidRoles.admin)
  deleteRole(@Param('roleId') roleId: string) {
    return this.rolesService.delete(roleId);
  }
}

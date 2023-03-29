import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { RolesService } from '../services/role.service';

@Controller({
  path: 'roles',
  version: '1',
})
export class RoleController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  createRole(@Body() dto: CreateRoleDto) {
    return this.rolesService.create(dto);
  }

  @Get()
  getRoles() {
    return this.rolesService.get();
  }

  @Put(':roleId')
  changeRole(@Param('roleId') roleId: string, @Body() dto: CreateRoleDto) {
    return this.rolesService.modify(roleId, dto);
  }

  @Delete(':roleId')
  deleteRole(@Param('roleId') roleId: string) {
    return this.rolesService.delete(roleId);
  }
}

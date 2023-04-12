import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { GetUser } from '../../auth/decorator/get-user.decorator';
import { JwtInfo } from '../../auth/interfaces/jwtinfo.type';
import { UsersDirectoryService } from '../services/users-directory.service';

@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly directory: UsersDirectoryService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async update(@GetUser() userInfo: JwtInfo) {
    const { user, role } = await this.directory.findUser(userInfo.sub);
    return {
      ...user,
      role: role.roleName,
      roleId: role.roleId,
    };
  }
}

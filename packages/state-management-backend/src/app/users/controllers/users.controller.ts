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
  async get(@GetUser() userInfo: JwtInfo) {
    const data = await this.directory.findUser(userInfo.sub);
    return {
      user: data.user,
      role: data.role.roleName,
      roleId: data.role.roleId,
    };
  }
}

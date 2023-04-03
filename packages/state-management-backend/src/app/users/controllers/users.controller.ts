import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { GetUser } from '../../auth/decorator/get-user.decorator';
import { JwtInfo } from '../../auth/interfaces/jwtinfo.type';
import { UsersDirectorysService } from '../services/users-directory.service';

@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly directory: UsersDirectorysService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async update(@GetUser() userInfo: JwtInfo) {
    const { user } = await this.directory.findUser(userInfo.sub);
    return user;
  }
}

import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { GetUser } from './decorator/get-user.decorator';
import { Roles } from './decorator/role.decorator';
import { SignInDto } from './dto/sigin.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RolesGuard } from './guard/role.guard';
import { JwtInfo } from './interfaces/jwtinfo.type';
import { Role } from './interfaces/role.enum';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() credentials: SignInDto) {
    return this.authService.signIn(credentials);
  }

  @UseGuards(JwtAuthGuard)
  @Post('signout')
  async signOut(@GetUser() userInfo: JwtInfo) {
    return this.authService.signOut(userInfo);
  }

  @Post('signup')
  async signUp(@Body() userInfo: CreateUserDto) {
    return this.authService.signUp(userInfo);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('account/:userId/role/:newRole')
  @Roles(Role.Admin)
  async changeRole(
    @GetUser() currentUser: JwtInfo,
    @Param('userId') userId: string,
    @Param('newRole') newRole: string,
  ) {
    return this.authService.changeRole(currentUser, userId, newRole);
  }
}

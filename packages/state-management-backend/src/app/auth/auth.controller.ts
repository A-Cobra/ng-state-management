import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { GetUser } from './decorator/get-user.decorator';
import { SignInDto } from './dto/sigin.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RefreshTokenGuard } from './guard/refrest-token.guard';
import { JwtInfo } from './interfaces/jwtinfo.type';
import { Request } from 'express';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/local/signin')
  async signIn(@Body() credentials: SignInDto) {
    return this.authService.signIn(credentials);
  }

  @UseGuards(JwtAuthGuard)
  @Post('signout')
  async signOut(@GetUser() userInfo: JwtInfo) {
    return this.authService.signOut(userInfo);
  }

  @Post('/local/signup')
  async signUp(@Body() userInfo: CreateUserDto) {
    return this.authService.signUp(userInfo);
  }

  @UseGuards(JwtAuthGuard)
  @Post('account/:userId/role/:newRole')
  async changeRole(
    @GetUser() currentUser: JwtInfo,
    @Param('userId') userId: string,
    @Param('newRole') newRole: string
  ) {
    return this.authService.changeRole(currentUser, userId, newRole);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}

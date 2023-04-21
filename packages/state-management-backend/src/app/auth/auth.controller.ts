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
import { AuthService } from './services/auth.service';
import { GetUser } from './decorator/get-user.decorator';
import { SignInDto } from './dto/signin.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RefreshTokenGuard } from './guard/refrest-token.guard';
import { JwtInfo } from './interfaces/jwtinfo.type';
import { Request } from 'express';
import { Tokens } from './interfaces/tokens';
import { ApiTags } from '@nestjs/swagger';
import { CreateCustomerDto } from '../customers/dto/create-customer.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/local/signin')
  async signIn(@Body() credentials: SignInDto): Promise<Tokens> {
    return this.authService.signIn(credentials);
  }

  @UseGuards(JwtAuthGuard)
  @Post('signout')
  async signOut(@GetUser() userInfo: JwtInfo) {
    return this.authService.signOut(userInfo);
  }

  @Post('/local/signup')
  async signUp(@Body() userInfo: CreateCustomerDto) {
    return this.authService.signUp(userInfo);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}

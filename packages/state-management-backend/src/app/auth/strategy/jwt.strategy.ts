import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtInfo } from '../interfaces/jwtinfo.type';
import { UsersDirectoryService } from '../../users/services/users-directory.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private usersService: UsersDirectoryService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(userInfo: JwtInfo) {
    //find a user with jwt info
    const user = await this.usersService.findUser(userInfo.sub);

    //find out if the user is signed in, that means jwt is valid
    if (!user.isLoggedIn) {
      throw new UnauthorizedException('Please sign in');
    }

    return { ...userInfo };
  }
}

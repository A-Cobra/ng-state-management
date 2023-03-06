import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtInfo } from './interfaces/jwtinfo.type';
import {
  hashPassword,
  signToken,
  validatePassword,
} from './utils/jwt.util';
import { SignInDto } from './dto/sigin.dto';
import { UsersService } from '../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
  ) {}

  async signIn(credentials: SignInDto) {
    const user = await this.userService.findOne(credentials);

    await validatePassword(user.password, credentials.password);

    await this.userService.logInUser(user);

    const token = await signToken(user);

    return {
      status: 'OK',
      message: 'Login successful',
      userInfo: {
        username: credentials.username,
        token,
      },
    };
  }

  async signOut(userInfo: JwtInfo) {
    const user = await this.userService.findOne(userInfo.sub);

    await this.userService.logOutUser(user);

    return {
      status: 'OK',
      message: 'Logout successful',
      data: [{ userId: userInfo.sub }],
    };
  }

  async signUp(userInfo: CreateUserDto) {
    userInfo.password = await hashPassword(userInfo.password);
    return this.userService.create(userInfo);
  }

  async changeRole(
    currentUser: JwtInfo,
    userId: string,
    newRole: string,
  ) {
    const user = await this.userService.findOne(userId);

    if (currentUser.sub !== user.userId) {
      return this.userService.updateRole(user, newRole);
    } else {
      throw new ConflictException(
        `Can't change your own role, ask another admin for help`,
      );
    }
  }



  async createAdminUser() {
    const users = await this.userService.findAll();

    if (users.length === 0) {
      const adminUser: CreateUserDto = {
        username: 'admin',
        password: 'admin',
      };

      const currentUser: JwtInfo = {
        sub: '0',
        iat: 0,
        exp: 0,
      };

      const admin = await this.signUp(adminUser);

      await this.changeRole(currentUser, admin.userId, 'admin');
    }
  }
}

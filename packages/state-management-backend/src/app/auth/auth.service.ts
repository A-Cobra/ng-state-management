import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtInfo } from './interfaces/jwtinfo.type';
import { hashData, signToken, validateCode } from './utils/jwt.util';
import { SignInDto } from './dto/signin.dto';
import { UsersService } from '../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { UsersDirectorysService } from '../users/services/users-directory.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private directoryService: UsersDirectorysService
  ) {}

  async signIn(credentials: SignInDto) {
    const userCredentials = await this.directoryService.findUserByEmail(
      credentials.email
    );

    await validateCode(userCredentials.password, credentials.password);

    await this.directoryService.changeUserLogState(
      userCredentials.user.userId,
      true
    );

    const tokens = await this.getTokens(
      userCredentials.user.userId,
      userCredentials.email,
      userCredentials.role
    );
    await this.updateRefreshToken(
      userCredentials.user.userId,
      tokens.refreshToken
    );

    return {
      status: 'OK',
      message: 'Login successful',
      userInfo: {
        email: credentials.email,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    };
  }

  async signOut(userInfo: JwtInfo) {
    const credentials = await this.directoryService.findUser(userInfo.sub);

    await this.directoryService.changeUserLogState(
      credentials.user.userId,
      false
    );

    return {
      status: 'OK',
      message: 'Logout successful',
      data: [{ userId: userInfo.sub }],
    };
  }

  async signUp(userInfo: CreateUserDto) {
    userInfo.password = await hashData(userInfo.password);
    //return this.userService.create(userInfo);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await hashData(refreshToken);
    await this.directoryService.updateRefreshToken(userId, hashedRefreshToken);
  }

  async getTokens(userId: string, email: string, role: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
          role: role,
        },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: '15m',
        }
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
          role: role,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        }
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async createAdminUser(): Promise<void> {
    const users = await this.directoryService.findAll();

    if (users.length === 0) {
      const adminUser: CreateUserDto = {
        email: 'admin@email.com',
        username: 'admin',
        password: 'admin',
      };

      const currentUser: JwtInfo = {
        sub: '0',
        iat: 0,
        exp: 0,
      };

      const admin = await this.signUp(adminUser);
    }
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const credentials = await this.directoryService.findUser(userId);

    if (!credentials || !credentials.refreshToken)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await validateCode(
      credentials.refreshToken,
      refreshToken
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(
      credentials.user.userId,
      credentials.email,
      credentials.user.role
    );
    await this.updateRefreshToken(credentials.user.userId, tokens.refreshToken);

    return tokens;
  }
}

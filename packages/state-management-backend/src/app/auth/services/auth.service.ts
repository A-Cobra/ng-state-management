import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { JwtInfo } from '../interfaces/jwtinfo.type';
import { hashData, validateCode } from '../utils/jwt.util';
import { SignInDto } from '../dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersDirectoryService } from '../../users/services/users-directory.service';
import { Tokens } from '../interfaces/tokens';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private directoryService: UsersDirectoryService
  ) {}

  async signIn(credentials: SignInDto): Promise<Tokens> {
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
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
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

  async getTokens(
    userId: string,
    email: string,
    role: string
  ): Promise<Tokens> {
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

  async refreshTokens(userId: string, refreshToken: string): Promise<Tokens> {
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

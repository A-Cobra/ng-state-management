import { Test } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { createMock } from '@golevelup/ts-jest';
import { JwtService } from '@nestjs/jwt';
import { UsersDirectoryService } from '../../users/services/users-directory.service';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../users/entities/role.entity';

describe('AuthService', () => {
  let authService: AuthService;

  const signInDtoStub = {
    email: 'user@mail.com',
    password: '1234',
  };

  const userDto: User = {
    userId: '1',
    username: 'c',
    name: 'c',
    lastname: 'c',
    picture: 'link',
    email: 'user@mail.com',
    contactNumber: '3239239',
    deleted: false,
  };

  const credentialsStub = {
    user: userDto,
    email: 'user@mail.com',
    role: 'ADMIN',
    password: '$123',
    isLoggedIn: true,
    refreshToken: '123456',
  };

  const tokensStub = ['JWT', 'JWTR'];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue(tokensStub),
          },
        },
        UsersDirectoryService,
        {
          provide: UsersDirectoryService,
          useValue: {
            findUserByEmail: jest.fn().mockResolvedValue(credentialsStub),
            findUser: jest.fn().mockResolvedValue(credentialsStub),
            updateRefreshToken: jest.fn(),
            changeUserLogState: jest.fn(),
          },
        },
      ],
    })
      .useMocker(createMock)
      .compile();

    authService = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
});

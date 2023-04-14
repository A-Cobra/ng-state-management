import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserCredentials } from '../entities/user-credentials.entity';
import { EntityRepository } from '@mikro-orm/core';
import { createUserCredentialsDto } from '../dto/create-user-credentials.dto';
import { hashData } from '../../auth/utils/jwt.util';
import { InjectRepository } from '@mikro-orm/nestjs';
import { RolesService } from './role.service';
import { UsersService } from './users.service';
import { ValidRoles } from '../../auth/interfaces/valid-roles.type';

@Injectable()
export class UsersDirectoryService {
  constructor(
    @InjectRepository(UserCredentials)
    private readonly repository: EntityRepository<UserCredentials>,
    private readonly roleService: RolesService,
    private readonly usersService: UsersService
  ) {}

  async createUserCredentials(dto: createUserCredentialsDto) {
    const role = await this.roleService.findRole(dto.role);

    const credentials = this.repository.create({
      ...dto,
      role: role,
      password: await hashData(dto.password),
    });

    this.repository.persistAndFlush(credentials);

    return credentials;
  }

  async findUser(userId: string) {
    const credentials = await this.repository.findOne(
      {
        userId: userId,
      },
      {
        populate: ['role'],
      }
    );

    if (!credentials) throw new NotFoundException('User not found');

    if (credentials.role.roleName === ValidRoles.admin) {
      return {
        ...credentials,
        user: undefined,
        role: credentials.role,
      };
    }

    const user = await this.usersService.findUser(
      credentials.userId,
      credentials.role.roleName
    );

    return {
      ...credentials,
      user: user,
      role: credentials.role,
    };
  }

  async findUserByEmail(email: string) {
    const credentials = await this.repository.findOne(
      {
        email: email,
      },
      {
        populate: ['role'],
      }
    );

    if (!credentials) throw new NotFoundException('User not found');

    return credentials;
  }

  async changeUserLogState(userId: string, state: boolean) {
    const user = await this.repository.findOne({
      userId: userId,
    });

    if (!user) throw new NotFoundException('User not found');

    user.isLoggedIn = state;

    await this.repository.flush();

    return user;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const user = await this.repository.findOne({
      userId: userId,
    });

    if (!user) throw new NotFoundException('User not found');

    user.refreshToken = refreshToken;

    await this.repository.flush();
  }

  async findAll() {
    return this.repository.findAll();
  }
}

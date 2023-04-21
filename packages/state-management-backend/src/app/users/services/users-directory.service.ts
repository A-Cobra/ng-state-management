import {
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import { UserCredentials } from '../entities/user-credentials.entity';
import {
  EntityRepository,
  EntityManager,
  UseRequestContext,
} from '@mikro-orm/core';
import { createUserCredentialsDto } from '../dto/create-user-credentials.dto';
import { hashData } from '../../auth/utils/jwt.util';
import { InjectRepository } from '@mikro-orm/nestjs';
import { RolesService } from './role.service';
import { UsersService } from './users.service';
import { ValidRoles } from '../../auth/interfaces/valid-roles.type';
import { Role } from '../entities/role.entity';
import { v4 } from 'uuid';

@Injectable()
export class UsersDirectoryService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(UserCredentials)
    private readonly repository: EntityRepository<UserCredentials>,
    private readonly roleService: RolesService,
    private readonly em: EntityManager,
    private readonly usersService: UsersService
  ) {}

  async onApplicationBootstrap() {
    const fork = this.em.fork();

    const admin = await fork.findOne(UserCredentials, {
      email: 'admin@email.com',
    });

    const role = fork.create(Role, { roleName: ValidRoles.admin });

    if (!admin) {
      const credentials = fork.create(UserCredentials, {
        userId: v4(),

        email: process.env.ADMIN_EMAIL,

        password: await hashData(process.env.ADMIN_PASSWORD),

        role: role,
      });

      fork.persistAndFlush(credentials);
    }
  }

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
    const user = await this.repository.findOne(
      {
        email: email,
      },
      {
        populate: ['role'],
      }
    );

    if (!user) throw new NotFoundException('User not found');

    return user;
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

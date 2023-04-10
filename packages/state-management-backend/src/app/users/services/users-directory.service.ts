import { Injectable, NotFoundException } from '@nestjs/common';
import { UserCredentials } from '../entities/user-credentials.entity';
import { EntityRepository } from '@mikro-orm/core';
import { createUserCredentialsDto } from '../dto/create-user-credentials.dto';
import { hashData } from '../../auth/utils/jwt.util';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class UsersDirectoryService {
  constructor(
    @InjectRepository(UserCredentials)
    private readonly repository: EntityRepository<UserCredentials>
  ) {}

  async createUserCredentials(dto: createUserCredentialsDto) {
    const credentials = this.repository.create({
      ...dto,
      password: await hashData(dto.password),
    });

    this.repository.persistAndFlush(credentials);

    return credentials;
  }

  async findUser(userId: string) {
    const user = await this.repository.findOne({
      user: { userId: userId, deleted: false },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.repository.findOne({
      user: { email: email, deleted: false },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async changeUserLogState(userId: string, state: boolean) {
    const user = await this.repository.findOne({
      user: { userId: userId, deleted: false },
    });

    if (!user) throw new NotFoundException('User not found');

    user.isLoggedIn = state;

    await this.repository.flush();

    return user;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const user = await this.repository.findOne({
      user: { userId: userId, deleted: false },
    });

    if (!user) throw new NotFoundException('User not found');

    user.refreshToken = refreshToken;

    await this.repository.flush();
  }

  async findAll() {
    return this.repository.findAll();
  }
}

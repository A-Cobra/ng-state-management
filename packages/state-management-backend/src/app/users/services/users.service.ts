import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/services/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    return this.userRepository.create(data);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(user_id: string): Promise<User> {
    const user = await this.userRepository.findOne({ user_id });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  async update(user_id: string, updatedUserInfo: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ user_id });
    wrap(user).assign(updatedUserInfo);
    await this.userRepository.flush();

    return user;
  }

  async remove(user_id: string) {
    const deletedUser = this.userRepository.remove({ user_id });

    if (!deletedUser) {
      throw new NotFoundException(`user with id: ${user_id} not found`);
    }
  }

  async changeUserLogState(user_id: string, state: boolean): Promise<User> {
    const found_user = await this.userRepository.findOne({ user_id });
    found_user.isLoggedIn = state;

    await this.userRepository.flush();

    return found_user;
  }

  async updateRole(user_id: string, role_name: string): Promise<User> {
    const found_user = await this.userRepository.findOne({ user_id });
    found_user.role = role_name;
    await this.userRepository.flush();

    return found_user;
  }
}

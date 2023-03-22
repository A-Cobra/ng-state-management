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
    private readonly userRepository: EntityRepository<User>,
    ) {}

  async create(data: CreateUserDto): Promise<User>{
    return this.userRepository.create(data);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(userId: string): Promise<User> {

    const user = await this.userRepository.findOne({userId});

    if (!user) {
      throw new NotFoundException(
        'user not found',
      );
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {

    const user = await this.userRepository.findOne({email});

    if (!user) {
      throw new NotFoundException(
        'user not found',
      );
    }

    return user;
  }

  async update(userId: string, updatedUserInfo: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({userId});
    wrap(user).assign(updatedUserInfo);
    await this.userRepository.flush();

    return user;
  }

  async remove(userId: string) {
    const deletedUser = this.userRepository.remove({ userId });

    if (!deletedUser) {
      throw new NotFoundException(
        `user with id: ${userId} not found`,
      );
    }
  }

  async changeUserLogState(userId: string, state: boolean): Promise<User>{
    const found_user = await this.userRepository.findOne({ userId });
    found_user.isLoggedIn = state;
    
    await this.userRepository.flush();

    return found_user;
  }

  async updateRole(userId: string, role_name: string): Promise<User>{
    const found_user = await this.userRepository.findOne({ userId });
    found_user.role = role_name;
    await this.userRepository.flush();

    return found_user;
  }
}

import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BusinessHq } from '../../business/entities/business.entity';
import { BusinessService } from '../../business/services/business.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly businessService: BusinessService
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    return this.userRepository.create(data);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ userId });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user =
      (await this.userRepository.findOne({ email })) ||
      (await this.businessService.findByEmail(email));

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  async update(userId: string, updatedUserInfo: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ userId });

    //this.userRepository.assign(user, updatedUserInfo);

    await this.userRepository.flush();

    return user;
  }

  async remove(userId: string) {
    const deletedUser = this.userRepository.remove({ userId });

    if (!deletedUser) {
      throw new NotFoundException(`user with id: ${userId} not found`);
    }
  }

  async changeUserLogState(userId: string, state: boolean): Promise<User> {
    const foundUser =
      (await this.userRepository.findOne({ userId })) ||
      (await this.businessService.findById(userId));

    if (foundUser instanceof BusinessHq)
      return this.businessService.changeBusinessLogState(userId, state);

    foundUser.isLoggedIn = state;

    await this.userRepository.flush();

    return foundUser;
  }

  async updateRole(userId: string, roleName: string): Promise<User> {
    const foundUser = await this.userRepository.findOne({ userId });
    foundUser.role = roleName;
    await this.userRepository.flush();

    return foundUser;
  }
}

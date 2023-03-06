import { Injectable, NotFoundException } from '@nestjs/common';
import { SignInDto } from '../../auth/dto/sigin.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository){}

  async create(userInfo: CreateUserDto){
    return this.userRepository.createOneUser(userInfo);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAllUsers();
  }

  async findOne(userId: string | SignInDto) {

    const user = await this.userRepository.findOneUser(userId);

    if (!user) {
      throw new NotFoundException(
        'user not found',
      );
    }

    return user;
  }

  async update(userId: string, updatedUserInfo: UpdateUserDto) {
    const user = await this.findOne(userId);

    await this.userRepository.updateOneUser(user, updatedUserInfo);

    return { userId, update: { ...updatedUserInfo } };
  }

  async remove(userId: string) {
    const deletedUser = await this.userRepository.deleteOneUser(
      userId,
    );

    if (deletedUser.affected === 0) {
      throw new NotFoundException(
        `user with id: ${userId} not found`,
      );
    }
  }

  async logInUser(user: User){
    return this.userRepository.updateLogInStatus(user, true);
  }

  async logOutUser(user: User){
    return this.userRepository.updateLogInStatus(user, false);
  }

  async updateRole(user: User, newRole: string){
    return this.userRepository.updateRole(user, newRole);
  }
}

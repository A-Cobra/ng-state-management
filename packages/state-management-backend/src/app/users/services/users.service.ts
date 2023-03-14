import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/services/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User>{
    return this.prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: data.password,
        isLoggedIn: false
      }
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(userId: string): Promise<User> {

    const user = await this.prisma.user.findUnique({
      where: {
        userId: userId
      }
    });

    if (!user) {
      throw new NotFoundException(
        'user not found',
      );
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {

    const user = await this.prisma.user.findUnique({
      where: {
        email: email
      },
    });

    if (!user) {
      throw new NotFoundException(
        'user not found',
      );
    }

    return user;
  }

  async update(userId: string, updatedUserInfo: UpdateUserDto): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: {
        userId: userId
      },
      data: updatedUserInfo
    });

    return updatedUser;
  }

  async remove(userId: string) {
    const deletedUser = await this.prisma.user.delete({
      where: {
        userId: userId
      },
    });

    if (!deletedUser) {
      throw new NotFoundException(
        `user with id: ${userId} not found`,
      );
    }
  }

  async changeUserLogState(user: User, state: boolean): Promise<User>{
    const updatedUser = await this.prisma.user.update({
      where: {
        userId: user.userId
      },
      data: {
        isLoggedIn: state
      }
    });

    return updatedUser;
  }

  async updateRole(user: User, newRole: string): Promise<User>{
    const updatedUser = await this.prisma.user.update({
      where: {
        userId: user.userId
      },
      data: {
        role: newRole
      }
    });

    return updatedUser;
  }
}

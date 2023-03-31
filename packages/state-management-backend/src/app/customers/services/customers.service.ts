import { EntityRepository, FilterQuery, Loaded } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { hashData } from '../../auth/utils/jwt.util';
import { PaginationResult } from '../../common/interfaces/pagination-result.interface';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/services/users.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Customer } from '../entities/customer.entity';
import { PaginatedResult } from '../interfaces/pagination.interface';
import { CustomerSearchQuery } from '../interfaces/query.interface';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: EntityRepository<Customer>,
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<User> {
    createCustomerDto.password = await hashData(createCustomerDto.password);
    const user = await this.usersService.create(createCustomerDto);
    const customer = this.customerRepository.create({ user });
    await this.customerRepository.persistAndFlush(customer);
    return user;
  }

  async findAll(
    queryParams: CustomerSearchQuery
  ): Promise<PaginationResult<Loaded<Customer, 'user'>>> {
    const { queryTerm } = queryParams;
    let { limit, page } = queryParams;
    limit = limit || 10;
    page = page || 1;

    let queryOptions: FilterQuery<Customer> = { isDeleted: false };

    if (queryTerm) {
      queryOptions = {
        $and: [
          {
            user: {
              $or: [
                { username: { $ilike: `%${queryTerm}%` } },
                { lastname: { $ilike: `%${queryTerm}%` } },
                { name: { $ilike: `%${queryTerm}%` } },
              ],
            },
          },
          { isDeleted: false },
        ],
      };
    }

    const [data, total] = await this.customerRepository.findAndCount(
      queryOptions,
      {
        populate: ['user'],
        offset: (page - 1) * limit,
        limit,
      }
    );

    const totalPages = Math.ceil(total / limit);
    return {
      data,
      page,
      totalResults: total,
      totalPages,
    };
  }

  async findOne(id: string): Promise<Loaded<Customer, 'user'>> {
    const [find, count] = await this.customerRepository.findAndCount(
      { $and: [{ user: { userId: id } }, { isDeleted: false }] },
      { populate: ['user'], limit: 1 }
    );
    if (count === 0) {
      throw new NotFoundException(`user with id: ${id} not found`);
    }
    return find[0];
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto
  ): Promise<User> {
    const customerInfo = await this.findOne(id);

    const { refreshToken } = await this.authService.getTokens(
      customerInfo.user.userId,
      customerInfo.user.username,
      'customer'
    );

    const hashedRefreshToken = await hashData(refreshToken);

    const userUpdate = {
      ...updateCustomerDto,
      refreshToken: hashedRefreshToken,
    };

    return this.usersService.update(id, userUpdate);
  }

  async remove(id: string): Promise<void> {
    const customer = await this.findOne(id);
    customer.isDeleted = true;
    return this.customerRepository.persistAndFlush(customer);
  }
}

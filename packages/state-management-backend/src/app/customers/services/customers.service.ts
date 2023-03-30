import { EntityRepository, FilterQuery, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { hashData } from '../../auth/utils/jwt.util';
import { UsersService } from '../../users/services/users.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: EntityRepository<Customer>,
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    createCustomerDto.password = await hashData(createCustomerDto.password);
    const user = await this.usersService.create(createCustomerDto);
    const customer = this.customerRepository.create({ user });
    await this.customerRepository.persistAndFlush(customer);
    return user;
  }

  async findAll(queryParams) {
    let { queryTerm, limit, page } = queryParams;
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
      metaData: {
        currentPage: page,
        totalItems: total,
        totalPages,
      },
    };
  }

  async findOne(id: string) {
    const [find, count] = await this.customerRepository.findAndCount(
      { $and: [{ user: { user_id: id } }, { isDeleted: false }] },
      { populate: ['user'], limit: 1 }
    );
    if (count === 0) {
      throw new NotFoundException(`user with id: ${id} not found`);
    }
    return find;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const [customerInfo] = await this.findOne(id);

    const { refreshToken } = await this.authService.getTokens(
      customerInfo.user.user_id,
      customerInfo.user.username
    );

    const userUpdate = {
      ...updateCustomerDto,
      refresh_token: refreshToken,
    };
    return this.usersService.update(id, userUpdate);
  }

  async remove(id: string) {
    const customer = await this.customerRepository.findOne({
      user: { user_id: id },
    });

    if (!customer) throw new NotFoundException('User Not Found');
    const updatedCustomerInfo: Partial<Customer> = { isDeleted: true };
    wrap(customer).assign(updatedCustomerInfo);

    return this.customerRepository.flush();
  }
}

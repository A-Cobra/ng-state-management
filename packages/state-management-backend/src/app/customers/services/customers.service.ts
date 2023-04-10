import { EntityRepository, FilterQuery, Loaded } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { ValidRoles } from '../../auth/interfaces/valid-roles.type';
import { hashData } from '../../auth/utils/jwt.util';
import { PaginationResult } from '../../common/interfaces/pagination-result.interface';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Customer } from '../entities/customer.entity';
import { JwtInfo } from '../../auth/interfaces/jwtinfo.type';
import { SearchQueryDto } from '../dto/search-query.dto';
import { UsersDirectoryService } from '../../users/services/users-directory.service';
import { AuthService } from '../../auth/services/auth.service';
import { paginationParameters } from '../../common/methods/pagination-parameters';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: EntityRepository<Customer>,
    private readonly authService: AuthService,
    private readonly directoryService: UsersDirectoryService
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    // todo Fix method when authService is ready
    createCustomerDto.password = await hashData(createCustomerDto.password);
    const customer = this.customerRepository.create(createCustomerDto);

    await this.directoryService.createUserCredentials({
      user: customer,
      email: createCustomerDto.email,
      password: createCustomerDto.password,
      role: ValidRoles.customer,
    });

    await this.customerRepository.persistAndFlush(customer);
    return customer;
  }

  async findAll(
    queryParams: SearchQueryDto
  ): Promise<PaginationResult<Loaded<Customer>>> {
    const { limit, page, search } = paginationParameters(queryParams);

    let queryOptions: FilterQuery<Customer> = { isDeleted: false };

    if (search) {
      queryOptions = {
        $and: [
          {
            $or: [
              { username: { $ilike: `%${search}%` } },
              { lastname: { $ilike: `%${search}%` } },
              { name: { $ilike: `%${search}%` } },
            ],
          },
          { isDeleted: false },
        ],
      };
    }

    const [data, total] = await this.customerRepository.findAndCount(
      queryOptions,
      {
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

  async findOne(
    id: string,
    currentCustomer: JwtInfo
  ): Promise<Loaded<Customer>> {
    const customer = await this.findById(id);

    if (currentCustomer.role === ValidRoles.customer)
      this.validateSameCustomer(customer, currentCustomer);

    return customer;
  }

  async findById(id: string): Promise<Loaded<Customer>> {
    const [find, count] = await this.customerRepository.findAndCount(
      { $and: [{ userId: id }, { isDeleted: false }] },
      { limit: 1 }
    );
    if (count === 0) {
      throw new NotFoundException(`user with id: ${id} not found`);
    }
    return find[0];
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
    currentCustomer: JwtInfo
  ): Promise<Partial<Customer>> {
    const customerInfo = await this.findById(id);

    if (currentCustomer.role === ValidRoles.customer)
      this.validateSameCustomer(customerInfo, currentCustomer);

    const { refreshToken } = await this.authService.getTokens(
      customerInfo.userId,
      customerInfo.username,
      customerInfo.role
    );

    const hashedRefreshToken = await hashData(refreshToken);

    const userUpdate = {
      ...updateCustomerDto,
      refreshToken: hashedRefreshToken,
    };

    const { isDeleted, customer_id, ...rest } = customerInfo;

    this.customerRepository.assign(customerInfo, userUpdate);
    await this.customerRepository.flush();
    return { ...rest, ...userUpdate };
  }

  async remove(id: string) {
    const customer = await this.findById(id);
    customer.isDeleted = true;
    this.customerRepository.persistAndFlush(customer);

    return { message: 'User Removed Successfully' };
  }

  validateSameCustomer(foundCustomer: Customer, jwtUser: JwtInfo) {
    if (foundCustomer.userId !== jwtUser.sub) {
      throw new UnauthorizedException('Not Authorized to perform this action');
    }
    return;
  }
}

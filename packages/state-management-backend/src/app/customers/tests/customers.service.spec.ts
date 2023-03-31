import { getRepositoryToken } from '@mikro-orm/nestjs';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../auth/auth.service';
import * as hash from '../../auth/utils/jwt.util';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UpdateUserDto } from '../../users/dto/update-user.dto';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/services/users.service';
import { Customer } from '../entities/customer.entity';
import { CustomersService } from '../services/customers.service';
import { mockPaginationQuery, mockPaginationResponse } from './pagination.mock';
import { mockCustomers } from './customers.mocks';
import {
  mockCreateCustomerDto,
  mockUserResponse,
  mockMultipleUsersResponse,
  mockUser,
} from './users.mock';
import { UpdateCustomerDto } from '../dto/update-customer.dto';

describe('CustomersService', () => {
  let service: CustomersService;
  let mockUserService: Partial<UsersService>;
  let mockAuthService: Partial<AuthService>;

  const mockCustomerRepository = {
    create: jest.fn(),
    persistAndFlush: jest.fn(),
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    flush: jest.fn(),
  };

  beforeEach(async () => {
    mockAuthService = {
      getTokens: (userId: string, username: string) =>
        Promise.resolve({ accessToken: 'access', refreshToken: 'refresh' }),
    };

    mockUserService = {
      create: (data: CreateUserDto) =>
        Promise.resolve(mockUserResponse as User),
      findOne: (id: string) => Promise.resolve(mockUserResponse as User),
      update: (userId: string, updatedUserInfo: UpdateUserDto) =>
        Promise.resolve(mockUser),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        { provide: AuthService, useValue: mockAuthService },
        { provide: UsersService, useValue: mockUserService },
        {
          provide: getRepositoryToken(Customer),
          useValue: mockCustomerRepository,
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create user', async () => {
    jest
      .spyOn(hash, 'hashData')
      .mockReturnValueOnce(Promise.resolve('password'));

    jest.spyOn(mockUserService, 'create');
    mockCustomerRepository.create.mockReturnValueOnce(mockUserResponse);
    mockCustomerRepository.persistAndFlush.mockResolvedValueOnce(
      mockUserResponse
    );
    const result = await service.create(mockCreateCustomerDto);
    expect(mockUserService.create).toBeCalledTimes(1);
    expect(mockCustomerRepository.create).toBeCalledTimes(1);
    expect(mockCustomerRepository.persistAndFlush).toBeCalledTimes(1);
    expect(result).toEqual(mockUserResponse);
  });

  describe('should find all users', () => {
    it('should find all users with queries', async () => {
      const data = [mockUser];
      const total = data.length;
      const response = mockPaginationResponse;
      response.totalResults = total;
      response.totalPages = 1;
      response.data = data;

      mockCustomerRepository.findAndCount.mockReturnValueOnce([data, total]);
      const result = await service.findAll(mockPaginationQuery);
      expect(mockCustomerRepository.findAndCount).toBeCalledTimes(1);
      expect(result).toEqual(response);
    });

    it('should find all users without queries', async () => {
      const data = [mockUser];
      const total = data.length;
      const response = mockPaginationResponse;
      response.totalResults = total;
      response.totalPages = 1;
      response.page = 1;
      response.data = data;
      let query = mockPaginationQuery;
      query.limit = null;
      query.page = null;

      mockCustomerRepository.findAndCount.mockReturnValueOnce([data, total]);
      const result = await service.findAll(mockPaginationQuery);
      expect(mockCustomerRepository.findAndCount).toBeCalledTimes(1);
      expect(result).toEqual(response);
    });
  });

  describe('should find one', () => {
    it('should find one success ', async () => {
      const data = [mockUserResponse];
      const total = 1;
      mockCustomerRepository.findAndCount.mockReturnValueOnce([data, total]);
      const result = await service.findOne('id');
      expect(mockCustomerRepository.findAndCount).toBeCalledTimes(1);
      expect(result).toBe(mockUserResponse);
    });

    it('should find one failure ', async () => {
      const data = [];
      const total = 0;
      mockCustomerRepository.findAndCount.mockReturnValueOnce([data, total]);
      await expect(service.findOne('id')).rejects.toThrowError(
        NotFoundException
      );
      expect(mockCustomerRepository.findAndCount).toBeCalledTimes(1);
    });
  });

  it('should update', async () => {
    const data = mockMultipleUsersResponse.slice(0, 1);
    const total = data.length;
    const { contactNumber, ...rest } = mockUserResponse;
    const newNumber = +contactNumber;
    const newCustomer = {
      ...rest,
      contactNumber: newNumber,
    } as UpdateCustomerDto;

    const customer = mockCustomers[0];
    customer.user = mockUser;
    customer.user.userId = 'userid';

    mockCustomerRepository.findAndCount.mockReturnValueOnce([
      [customer],
      total,
    ]);

    jest.spyOn(service, 'findOne').mockReturnValueOnce(customer as any);

    jest
      .spyOn(hash, 'hashData')
      .mockReturnValueOnce(Promise.resolve('password'));
    jest.spyOn(mockAuthService, 'getTokens');
    const result = await service.update('id', newCustomer);
    expect(service.findOne).toBeCalledTimes(1);
    expect(mockAuthService.getTokens).toBeCalledTimes(1);
    expect(hash.hashData).toBeCalledTimes(1);
    expect(result).toEqual(mockUser);
  });

  it('should delete', async () => {
    const customer = mockCustomers[0];
    customer.user = mockUser;
    jest.spyOn(service, 'findOne').mockReturnValueOnce(customer as any);
    await service.remove('userid');
    expect(service.findOne).toBeCalledWith('userid');
    expect(mockCustomerRepository.persistAndFlush).toHaveBeenCalledWith(
      customer
    );
    expect(customer?.['isDeleted']).toEqual(true);
  });
});

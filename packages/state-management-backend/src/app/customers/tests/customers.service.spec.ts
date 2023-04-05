import { getRepositoryToken } from '@mikro-orm/nestjs';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import * as hash from '../../auth/utils/jwt.util';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UpdateUserDto } from '../../users/dto/update-user.dto';
import { User } from '../../users/entities/user.entity';
import { Customer } from '../entities/customer.entity';
import { CustomersService } from '../services/customers.service';
import { mockPaginationQuery, mockPaginationResponse } from './pagination.mock';
import { mockCustomers } from './customers.mocks';
import {
  mockCreateCustomerDto,
  mockUserResponse,
  mockMultipleUsersResponse,
  mockUser,
  mockCurrentCustomer,
} from './users.mock';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { UsersDirectoryService } from '../../users/services/users-directory.service';
import { AuthService } from '../../auth/services/auth.service';

describe('CustomersService', () => {
  let service: CustomersService;
  let mockDirectoryService: Partial<UsersDirectoryService>;
  let mockAuthService: Partial<AuthService>;

  const mockCustomerRepository = {
    create: jest.fn(),
    persistAndFlush: jest.fn(),
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    flush: jest.fn(),
    assign: jest.fn(),
  };

  beforeEach(async () => {
    mockAuthService = {
      getTokens: (userId: string, username: string) =>
        Promise.resolve({ accessToken: 'access', refreshToken: 'refresh' }),
    };

    mockDirectoryService = {
      createUserCredentials: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        { provide: AuthService, useValue: mockAuthService },
        { provide: UsersDirectoryService, useValue: mockDirectoryService },
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

    mockCustomerRepository.create.mockReturnValueOnce(mockUserResponse);
    mockCustomerRepository.persistAndFlush.mockResolvedValueOnce(
      mockUserResponse
    );
    const result = await service.create(mockCreateCustomerDto);
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
      const result = await service.findAll({ ...mockPaginationQuery });
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
      const query = mockPaginationQuery;
      query.limit = undefined;
      query.page = undefined;

      mockCustomerRepository.findAndCount.mockReturnValueOnce([data, total]);
      const result = await service.findAll({ ...mockPaginationQuery });
      expect(mockCustomerRepository.findAndCount).toBeCalledTimes(1);
      expect(result).toEqual(response);
    });
  });

  describe('should find one', () => {
    it('should find one success role!=customer ', async () => {
      const currentCustomer = mockCurrentCustomer;
      currentCustomer.role = 'admin';
      const mockService = jest
        .spyOn(service, 'findById')
        .mockReturnValueOnce(mockUserResponse as any);
      const result = await service.findOne('id', mockCurrentCustomer);
      expect(mockService).toBeCalledTimes(1);
      expect(result).toBe(mockUserResponse);
    });

    it('should find one success role===customer ', async () => {
      const currentCustomer = mockCurrentCustomer;
      currentCustomer.role = 'customer';
      const mockServiceValidation = jest
        .spyOn(service, 'validateSameCustomer')
        .mockReturnValueOnce();

      const mockService = jest
        .spyOn(service, 'findById')
        .mockReturnValueOnce(mockUserResponse as any);
      const result = await service.findOne('id', mockCurrentCustomer);
      expect(mockService).toBeCalledTimes(1);
      expect(result).toBe(mockUserResponse);
      expect(mockServiceValidation).toBeCalledTimes(1);
    });
  });

  describe('should Update', () => {
    it('should update role = customer', async () => {
      const customer = mockUserResponse;
      customer.role = 'customer';
      const currentCustomer = mockCurrentCustomer;
      currentCustomer.role = 'admin';
      const expectedResult = { ...customer, refreshToken: 'password' };

      const tokenResponse = {
        accessToken: 'access',
        refreshToken: 'refresh',
      };

      const mockService = jest
        .spyOn(service, 'findById')
        .mockReturnValueOnce(customer as any);

      const mockHash = jest
        .spyOn(hash, 'hashData')
        .mockReturnValueOnce(Promise.resolve('password'));

      const mockGetTokens = jest
        .spyOn(mockAuthService, 'getTokens')
        .mockReturnValueOnce(Promise.resolve(tokenResponse));

      const result = await service.update(
        'id',
        customer as User,
        currentCustomer
      );

      expect(result).toEqual(expectedResult);
      expect(mockService).toBeCalledTimes(1);
      expect(mockHash).toBeCalledTimes(1);
      expect(mockGetTokens).toBeCalledTimes(1);
      expect(mockHash).toBeCalledTimes(1);
      expect(mockCustomerRepository.assign).toBeCalledTimes(1);
      expect(mockCustomerRepository.flush).toBeCalledTimes(1);
    });

    it('should update role = customer', async () => {
      const customer = mockUserResponse;
      customer.role = 'customer';
      const currentCustomer = mockCurrentCustomer;
      currentCustomer.role = 'customer';
      const expectedResult = { ...customer, refreshToken: 'password' };

      const tokenResponse = {
        accessToken: 'access',
        refreshToken: 'refresh',
      };

      const mockService = jest
        .spyOn(service, 'findById')
        .mockReturnValueOnce(customer as any);

      const mockHash = jest
        .spyOn(hash, 'hashData')
        .mockReturnValueOnce(Promise.resolve('password'));

      const mockGetTokens = jest
        .spyOn(mockAuthService, 'getTokens')
        .mockReturnValueOnce(Promise.resolve(tokenResponse));

      const mockServiceValidation = jest
        .spyOn(service, 'validateSameCustomer')
        .mockReturnValueOnce();

      const result = await service.update(
        'id',
        customer as User,
        currentCustomer
      );

      expect(result).toEqual(expectedResult);
      expect(mockService).toBeCalledTimes(1);
      expect(mockHash).toBeCalledTimes(1);
      expect(mockGetTokens).toBeCalledTimes(1);
      expect(mockHash).toBeCalledTimes(1);
      expect(mockCustomerRepository.assign).toBeCalledTimes(1);
      expect(mockCustomerRepository.flush).toBeCalledTimes(1);
      expect(mockServiceValidation).toBeCalledTimes(1);
    });
  });

  it('should delete', async () => {
    const customer = mockUserResponse;
    jest.spyOn(service, 'findById').mockReturnValueOnce(customer as any);
    await service.remove('userid');
    expect(service.findById).toBeCalledWith('userid');
    expect(mockCustomerRepository.persistAndFlush).toHaveBeenCalledWith(
      customer
    );
    expect(customer?.['isDeleted']).toEqual(true);
  });

  it('should validate same customer', () => {
    const foundCustomer = mockUser;
    foundCustomer.role = 'customer';
    const currentCustomer = mockCurrentCustomer;
    currentCustomer.sub = 'userid';

    expect(
      service.validateSameCustomer(foundCustomer as Customer, currentCustomer)
    ).toBeUndefined();

    currentCustomer.sub = 'asdfas';

    try {
      service.validateSameCustomer(foundCustomer as Customer, currentCustomer);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  describe('Should Find by id', () => {
    it('should fin by id success', async () => {
      const data = [mockUser];
      const total = 1;
      mockCustomerRepository.findAndCount.mockReturnValueOnce([data, total]);
      const result = await service.findById('userId');

      expect(result).toEqual(mockUser);
      expect(mockCustomerRepository.findAndCount).toBeCalledTimes(1);
    });

    it('should fin by id failure', async () => {
      const data = [];
      const total = 0;
      mockCustomerRepository.findAndCount.mockReturnValueOnce([data, total]);
      await expect(
        service.findOne('id', mockCurrentCustomer)
      ).rejects.toThrowError(NotFoundException);
      expect(mockCustomerRepository.findAndCount).toBeCalledTimes(1);
    });
  });
});

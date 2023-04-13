import { Loaded } from '@mikro-orm/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from '../controllers/customers.controller';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Customer } from '../entities/customer.entity';
import { CustomersService } from '../services/customers.service';
import { mockCurrentCustomer, mockUserResponse } from './users.mock';
import { mockPaginationResponse, mockPaginationQuery } from './pagination.mock';
import { SearchQueryDto } from '../../common/dtos/search-query.dto';

describe('CustomersController', () => {
  let controller: CustomersController;
  let mockCustomersService: Partial<CustomersService>;

  beforeEach(async () => {
    mockCustomersService = {
      create: (value: CreateCustomerDto) =>
        Promise.resolve(mockUserResponse as Customer),
      findOne: (id: string) =>
        Promise.resolve(mockUserResponse as Loaded<Customer, 'user'>),
      remove: (id: string) => Promise.resolve({ message: 'message' }),
      update: (id: string, updateCustomerDto: UpdateCustomerDto) =>
        Promise.resolve(mockUserResponse as Customer),
      findAll: (query: SearchQueryDto) =>
        Promise.resolve(mockPaginationResponse as any),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        { provide: CustomersService, useValue: mockCustomersService },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a customer', async () => {
    const { contactNumber, ...rest } = mockUserResponse;
    const newNumber = contactNumber;
    const customer = { ...rest, contactNumber: newNumber } as CreateCustomerDto;
    const mockService = jest.spyOn(mockCustomersService, 'create');
    const result = await controller.create(customer as any);
    expect(result).toEqual(mockUserResponse);
    expect(mockService).toBeCalledTimes(1);
    expect(mockService).toBeCalledWith(customer);
  });

  it('should findAll', async () => {
    const { search, limit, page } = mockPaginationQuery;
    const mockService = jest.spyOn(mockCustomersService, 'findAll');
    const result = await controller.findAll({ search, page, limit });
    expect(result).toEqual(mockPaginationResponse);
    expect(mockService).toBeCalledTimes(1);
    expect(mockService).toBeCalledWith(mockPaginationQuery);
  });

  it('should findOne', async () => {
    const userId = 'userId';
    const mockService = jest.spyOn(mockCustomersService, 'findOne');
    const result = await controller.findOne(userId, mockCurrentCustomer);
    expect(result).toEqual(mockUserResponse);
    expect(mockService).toBeCalledTimes(1);
    expect(mockService).toBeCalledWith(userId, mockCurrentCustomer);
  });

  it('should update', async () => {
    const userId = 'userId';
    const { contactNumber, ...rest } = mockUserResponse;
    const newNumber = contactNumber;
    const customer = {
      ...rest,
      contactNumber: newNumber,
    } as UpdateCustomerDto;
    const mockService = jest.spyOn(mockCustomersService, 'update');
    const result = await controller.update(
      userId,
      customer,
      mockCurrentCustomer
    );
    expect(result).toEqual(mockUserResponse);
    expect(mockService).toBeCalledTimes(1);
    expect(mockService).toBeCalledWith(userId, customer, mockCurrentCustomer);
  });

  it('should delete', async () => {
    const userId = 'userId';
    const mockService = jest.spyOn(mockCustomersService, 'remove');
    const result = await controller.remove(userId);
    expect(result).toEqual({ message: 'message' });
    expect(mockService).toBeCalledTimes(1);
    expect(mockService).toBeCalledWith(userId);
  });
});

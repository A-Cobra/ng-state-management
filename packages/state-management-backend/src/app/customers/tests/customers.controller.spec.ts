import { Loaded } from '@mikro-orm/core';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../users/entities/user.entity';
import { CustomersController } from '../controllers/customers.controller';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Customer } from '../entities/customer.entity';
import { CustomerSearchQuery } from '../interfaces/query.interface';
import { CustomersService } from '../services/customers.service';
import { mockUserResponse } from './users.mock';
import { mockPaginationResponse, mockPaginationQuery } from './pagination.mock';

describe('CustomersController', () => {
  let controller: CustomersController;
  let mockCustomersService: Partial<CustomersService>;

  beforeEach(async () => {
    mockCustomersService = {
      create: (value: CreateCustomerDto) =>
        Promise.resolve(mockUserResponse as User),
      findOne: (id: string) =>
        Promise.resolve(mockUserResponse as Loaded<Customer, 'user'>),
      remove: (id: string) => Promise.resolve(),
      update: (id: string, updateCustomerDto: UpdateCustomerDto) =>
        Promise.resolve(mockUserResponse as User),
      findAll: (query: CustomerSearchQuery) =>
        Promise.resolve(mockPaginationResponse),
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
    const { contact_number, ...rest } = mockUserResponse;
    const newNumber = +contact_number;
    const customer = { ...rest, contact_number: newNumber };
    const mockService = jest.spyOn(mockCustomersService, 'create');
    const result = await controller.create(customer as CreateCustomerDto);
    expect(result).toEqual(mockUserResponse);
    expect(mockService).toBeCalledTimes(1);
    expect(mockService).toBeCalledWith(customer);
  });

  it('should findAll', async () => {
    const { queryTerm, limit, page } = mockPaginationQuery;
    const mockService = jest.spyOn(mockCustomersService, 'findAll');
    const result = await controller.findAll(queryTerm, page, limit);
    expect(result).toEqual(mockPaginationResponse);
    expect(mockService).toBeCalledTimes(1);
    expect(mockService).toBeCalledWith(mockPaginationQuery);
  });

  it('should findOne', async () => {
    const userId = 'userId';
    const mockService = jest.spyOn(mockCustomersService, 'findOne');
    const result = await controller.findOne(userId);
    expect(result).toEqual(mockUserResponse);
    expect(mockService).toBeCalledTimes(1);
    expect(mockService).toBeCalledWith(userId);
  });

  it('should update', async () => {
    const userId = 'userId';
    const { contact_number, ...rest } = mockUserResponse;
    const newNumber = +contact_number;
    const customer = {
      ...rest,
      contact_number: newNumber,
    } as UpdateCustomerDto;
    const mockService = jest.spyOn(mockCustomersService, 'update');
    const result = await controller.update(userId, customer);
    expect(result).toEqual(mockUserResponse);
    expect(mockService).toBeCalledTimes(1);
    expect(mockService).toBeCalledWith(userId, customer);
  });

  it('should delete', async () => {
    const userId = 'userId';
    const mockService = jest.spyOn(mockCustomersService, 'remove');
    const result = await controller.remove(userId);
    expect(result).toBeUndefined();
    expect(mockService).toBeCalledTimes(1);
    expect(mockService).toBeCalledWith(userId);
  });
});

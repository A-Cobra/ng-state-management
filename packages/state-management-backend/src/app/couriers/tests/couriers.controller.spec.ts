import { Test, TestingModule } from '@nestjs/testing';
import { CouriersController } from '../controllers/couriers.controller';
import { CouriersService } from '../services/couriers.service';
import { UpdateCourierDto } from '../dto/update-courier.dto';

import {
  mockCourier,
  mockCurrentCourier,
  mockPaginationQuery,
} from './mock-courier';
import {
  mockCreateCourierDto,
  mockCourierPaginationResponse,
} from './mock-courier';

describe('CouriersController', () => {
  let controller: CouriersController;

  const mockCouriersService: Partial<CouriersService> = {
    findAll: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CouriersController],
      providers: [{ provide: CouriersService, useValue: mockCouriersService }],
    }).compile();

    controller = module.get<CouriersController>(CouriersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create', async () => {
    const service = jest
      .spyOn(mockCouriersService, 'create')
      .mockResolvedValueOnce(Promise.resolve(mockCourier));

    const result = await controller.create(mockCreateCourierDto);
    expect(result).toEqual(mockCourier);
    expect(service).toBeCalledTimes(1);
  });

  it('should findAll', async () => {
    const response = mockCourierPaginationResponse;
    const service = jest
      .spyOn(mockCouriersService, 'findAll')
      .mockResolvedValueOnce(Promise.resolve(response));

    const result = await controller.findAll(mockPaginationQuery);
    expect(result).toEqual(response);
    expect(service).toBeCalledTimes(1);
  });

  it('should findOne', async () => {
    const response = mockCourier;
    const service = jest
      .spyOn(mockCouriersService, 'findOne')
      .mockResolvedValueOnce(Promise.resolve(response));

    const result = await controller.findOne('id', mockCurrentCourier);
    expect(result).toEqual(response);
    expect(service).toBeCalledTimes(1);
  });

  it('should update', async () => {
    const response = mockCourier;
    const update: UpdateCourierDto = {
      name: 'newName',
    };
    const service = jest
      .spyOn(mockCouriersService, 'update')
      .mockResolvedValueOnce(Promise.resolve(response));

    const result = await controller.update('id', update, mockCurrentCourier);
    expect(result).toEqual(response);
    expect(service).toBeCalledTimes(1);
  });

  it('should delete', async () => {
    const response = { message: 'deleted' };

    const service = jest
      .spyOn(mockCouriersService, 'remove')
      .mockResolvedValueOnce(Promise.resolve(response));

    const result = await controller.remove('id');
    expect(result).toEqual(response);
    expect(service).toBeCalledTimes(1);
  });
});

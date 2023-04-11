import { Test, TestingModule } from '@nestjs/testing';
import { CouriersService } from '../services/couriers.service';
import { UsersDirectoryService } from '../../users/services/users-directory.service';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Courier } from '../entities/courier.entity';
import {
  mockCourier,
  mockCourierPaginationResponse,
  mockCreateCourierDto,
  mockCurrentCourier,
  mockPaginationQuery,
} from './mock-courier';
import { NotFoundException } from '@nestjs/common';

describe('CouriersService', () => {
  let service: CouriersService;
  let mockDirectoryService: Partial<UsersDirectoryService>;

  const mockCourierRepository = {
    create: jest.fn(),
    persistAndFlush: jest.fn(),
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    flush: jest.fn(),
    assign: jest.fn(),
  };

  beforeEach(async () => {
    mockDirectoryService = {
      createUserCredentials: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CouriersService,
        { provide: UsersDirectoryService, useValue: mockDirectoryService },
        {
          provide: getRepositoryToken(Courier),
          useValue: mockCourierRepository,
        },
      ],
    }).compile();

    service = module.get<CouriersService>(CouriersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create', async () => {
    const create = jest
      .spyOn(mockCourierRepository, 'create')
      .mockResolvedValueOnce(mockCourier);
    const directory = jest.spyOn(mockDirectoryService, 'createUserCredentials');
    const persist = jest
      .spyOn(mockCourierRepository, 'persistAndFlush')
      .mockResolvedValueOnce(mockCourier);

    const result = await service.create(mockCreateCourierDto);
    expect(result).toEqual(mockCourier);
    expect(create).toHaveBeenCalledTimes(1);
    expect(directory).toHaveBeenCalledTimes(1);
    expect(persist).toHaveBeenCalledTimes(1);
  });

  describe('it should find by id', () => {
    it('should find by id success', async () => {
      const data = [mockCourier];
      const total = 1;
      const courierRepo = jest
        .spyOn(mockCourierRepository, 'findAndCount')
        .mockReturnValueOnce([data, total]);
      const result = await service.findById('userId');
      expect(result).toEqual(mockCourier);
      expect(courierRepo).toBeCalledTimes(1);
    });

    it('should find by id failure', async () => {
      const data = [];
      const total = 0;
      const courierRepo = jest
        .spyOn(mockCourierRepository, 'findAndCount')
        .mockReturnValueOnce([data, total]);
      await expect(
        service.findOne('id', mockCurrentCourier)
      ).rejects.toThrowError(NotFoundException);

      expect(courierRepo).toBeCalledTimes(1);
    });
  });

  it('should validate same courier', () => {
    const foundCourier = mockCourier;
    foundCourier.role = 'courier';
    const currentCourier = mockCurrentCourier;
    currentCourier.sub = 'userId';

    expect(
      service.validateSameCourier(foundCourier, currentCourier)
    ).toBeUndefined();

    currentCourier.sub = 'asdfas';

    try {
      service.validateSameCourier(foundCourier, currentCourier);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('should remove', async () => {
    const courier = mockCourier;
    courier.deleted = true;
    const findById = jest
      .spyOn(service, 'findById')
      .mockReturnValueOnce(Promise.resolve(mockCourier));
    const persist = jest.spyOn(mockCourierRepository, 'persistAndFlush');
    const result = await service.remove('userId');
    expect(result).toEqual({ message: 'Courier Removed Successfully' });
    expect(findById).toHaveBeenCalledTimes(1);
    expect(persist).toBeCalledTimes(1);
    expect(persist).toHaveBeenCalledWith(courier);
  });

  describe('Should update', () => {
    it('should update role === courier', async () => {
      const courier = mockCourier;
      const currentCourier = mockCurrentCourier;
      currentCourier.role === 'courier';
      const findById = jest
        .spyOn(service, 'findById')
        .mockReturnValueOnce(Promise.resolve(mockCourier));

      const validate = jest
        .spyOn(service, 'validateSameCourier')
        .mockReturnValueOnce(undefined);

      const assign = jest.spyOn(mockCourierRepository, 'assign');
      const flush = jest.spyOn(mockCourierRepository, 'flush');

      const result = await service.update('userId', courier, currentCourier);
      expect(result).toEqual(courier);
      expect(findById).toBeCalledTimes(1);
      expect(validate).toBeCalledTimes(1);
      expect(assign).toBeCalledTimes(1);
      expect(flush).toBeCalledTimes(1);
    });

    it('should update role !== courier', async () => {
      const courier = mockCourier;
      const currentCourier = mockCurrentCourier;
      currentCourier.role = 'admin';
      const findById = jest
        .spyOn(service, 'findById')
        .mockReturnValueOnce(Promise.resolve(mockCourier));

      const validate = jest
        .spyOn(service, 'validateSameCourier')
        .mockReturnValueOnce(undefined);

      const assign = jest.spyOn(mockCourierRepository, 'assign');
      const flush = jest.spyOn(mockCourierRepository, 'flush');

      const result = await service.update('userId', courier, currentCourier);
      expect(result).toEqual(courier);
      expect(findById).toBeCalledTimes(1);
      expect(validate).toBeCalledTimes(0);
      expect(assign).toBeCalledTimes(1);
      expect(flush).toBeCalledTimes(1);
    });
  });

  describe('should find one', () => {
    it('should find one role !== courier', async () => {
      const currentCourier = mockCurrentCourier;
      currentCourier.role = 'admin';
      const findById = jest
        .spyOn(service, 'findById')
        .mockReturnValueOnce(Promise.resolve(mockCourier));

      const validate = jest
        .spyOn(service, 'validateSameCourier')
        .mockReturnValueOnce(undefined);

      const result = await service.findOne('userId', currentCourier);
      expect(result).toEqual(mockCourier);
      expect(findById).toHaveBeenCalledTimes(1);
      expect(validate).toHaveBeenCalledTimes(0);
    });

    it('should find one role !== courier', async () => {
      const currentCourier = mockCurrentCourier;
      currentCourier.role = 'courier';
      const findById = jest
        .spyOn(service, 'findById')
        .mockReturnValueOnce(Promise.resolve(mockCourier));

      const validate = jest
        .spyOn(service, 'validateSameCourier')
        .mockReturnValueOnce(undefined);

      const result = await service.findOne('userId', currentCourier);
      expect(result).toEqual(mockCourier);
      expect(findById).toHaveBeenCalledTimes(1);
      expect(validate).toHaveBeenCalledTimes(1);
    });
  });

  describe('should find all users', () => {
    it('should find all users with queries', async () => {
      const data = [mockCourier];
      const total = data.length;
      const response = mockCourierPaginationResponse;
      response.totalResults = total;
      response.totalPages = 1;
      response.page = 1;
      response.data = data;
      const query = mockPaginationQuery;
      query.page = 1;

      const courierRepository = jest
        .spyOn(mockCourierRepository, 'findAndCount')
        .mockReturnValueOnce([data, total]);

      const result = await service.findAll({ ...mockPaginationQuery });
      expect(courierRepository).toBeCalledTimes(1);
      expect(result).toEqual(response);
    });
  });
});

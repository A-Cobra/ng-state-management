import { Test, TestingModule } from '@nestjs/testing';
import { CouriersVehicleService } from '../services/couriers-vehicle.service';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Courier } from '../entities/courier.entity';
import { CourierVehicle } from '../entities/courier-vehicle.entity';
import { CouriersService } from '../services/couriers.service';
import { mockCourier, mockCurrentCourier } from './mock-courier';
import { mockCourierVehicle } from './mock-courier-vehicle';

describe('Courier Vehicle', () => {
  let service: CouriersVehicleService;
  let mockCourierService: Partial<CouriersService>;

  const mockCouriersRepository = {
    findOne: jest.fn(),
    flush: jest.fn(),
    assign: jest.fn(),
  };

  const mockCouriersVehicleRepository = {
    flush: jest.fn(),
    assign: jest.fn(),
  };

  beforeEach(async () => {
    mockCourierService = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CouriersVehicleService,
        {
          provide: getRepositoryToken(Courier),
          useValue: mockCouriersRepository,
        },
        {
          provide: getRepositoryToken(CourierVehicle),
          useValue: mockCouriersVehicleRepository,
        },
        {
          provide: CouriersService,
          useValue: mockCourierService,
        },
      ],
    }).compile();
    service = module.get<CouriersVehicleService>(CouriersVehicleService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('should create', () => {
    it('should create if no vehicle', async () => {
      const courier = mockCourier;
      courier.vehicle = null;
      const returnMessage = { message: 'Vehicle added successfully' };

      const couriersService = jest
        .spyOn(mockCourierService, 'findById')
        .mockReturnValueOnce(Promise.resolve(mockCourier));
      const assign = jest.spyOn(mockCouriersRepository, 'assign');
      const flush = jest.spyOn(mockCouriersRepository, 'flush');

      const result = await service.create(
        mockCourierVehicle,
        mockCurrentCourier
      );
      expect(result).toEqual(returnMessage);
      expect(assign).toHaveBeenCalledTimes(1);
      expect(flush).toHaveBeenCalledTimes(1);
      expect(couriersService).toHaveBeenCalledTimes(1);
    });

    it('should throw error if  vehicle', async () => {
      const courier = mockCourier;
      courier.vehicle = mockCourierVehicle;

      const couriersService = jest
        .spyOn(mockCourierService, 'findById')
        .mockReturnValueOnce(Promise.resolve(mockCourier));
      try {
        await service.create(mockCourierVehicle, mockCurrentCourier);
      } catch (error) {
        expect(error).toBeTruthy();
        expect(couriersService).toHaveBeenCalledTimes(1);
      }
    });
  });

  describe('should update', () => {
    it('should update  has vehicle', async () => {
      const courier = mockCourier;
      courier.vehicle = mockCourierVehicle;
      const returnMessage = { message: 'Vehicle Updated successfully' };

      const courierRepository = jest
        .spyOn(mockCouriersRepository, 'findOne')
        .mockReturnValueOnce(Promise.resolve(mockCourier));

      const assign = jest.spyOn(mockCouriersVehicleRepository, 'assign');
      const flush = jest.spyOn(mockCouriersVehicleRepository, 'flush');

      const result = await service.update(
        mockCourierVehicle,
        mockCurrentCourier
      );
      expect(result).toEqual(returnMessage);
      expect(assign).toHaveBeenCalledTimes(1);
      expect(flush).toHaveBeenCalledTimes(1);
      expect(courierRepository).toHaveBeenCalledTimes(1);
    });

    it('should throw error if  vehicle', async () => {
      const courier = mockCourier;
      courier.vehicle = null;
      const courierRepository = jest
        .spyOn(mockCouriersRepository, 'findOne')
        .mockReturnValueOnce(Promise.resolve(courier));
      try {
        await service.update(mockCourierVehicle, mockCurrentCourier);
      } catch (error) {
        expect(error).toBeTruthy();
        expect(courierRepository).toHaveBeenCalledTimes(1);
      }
    });
  });
});

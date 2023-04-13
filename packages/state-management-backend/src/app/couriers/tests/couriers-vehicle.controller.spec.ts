import { Test, TestingModule } from '@nestjs/testing';
import { CouriersService } from '../services/couriers.service';
import { CouriersVehicleController } from '../controllers/couriers-vehicle.controller';
import { CouriersVehicleService } from '../services/couriers-vehicle.service';
import { mockCourierVehicle } from './mock-courier-vehicle';
import { mockCurrentCourier } from './mock-courier';

describe('CouriersVehicleController', () => {
  let controller: CouriersVehicleController;

  const mokcCouriersVehicleService: Partial<CouriersVehicleService> = {
    update: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CouriersVehicleController],
      providers: [
        {
          provide: CouriersVehicleService,
          useValue: mokcCouriersVehicleService,
        },
      ],
    }).compile();

    controller = module.get<CouriersVehicleController>(
      CouriersVehicleController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create', async () => {
    const response = { message: 'message' };
    const service = jest
      .spyOn(mokcCouriersVehicleService, 'create')
      .mockResolvedValueOnce(Promise.resolve(response));

    const result = await controller.create(
      mockCourierVehicle,
      mockCurrentCourier
    );
    expect(result).toEqual(response);
    expect(service).toBeCalledTimes(1);
  });

  it('should update', async () => {
    const response = { message: 'message' };
    const service = jest
      .spyOn(mokcCouriersVehicleService, 'update')
      .mockResolvedValueOnce(Promise.resolve(response));
    const result = await controller.update(
      mockCourierVehicle,
      mockCurrentCourier
    );
    expect(result).toEqual(response);
    expect(service).toBeCalledTimes(1);
  });
});

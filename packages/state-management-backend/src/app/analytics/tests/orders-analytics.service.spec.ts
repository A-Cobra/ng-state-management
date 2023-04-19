import { getRepositoryToken } from '@mikro-orm/nestjs';
import { BusinessOrderAnalyticsService } from '../services/business-orders-analytics.service';
import { Test } from '@nestjs/testing';
import { Order } from '../../orders/entities/order.entity';
import { OrderStatus } from '../../orders/entities/order-status.entity';
import { Courier } from '../../couriers/entities/courier.entity';
import { Payment } from '../../payment/entities/payment.entity';
import { Customer } from '../../customers/entities/customer.entity';
import { BusinessHq } from '../../business/entities/business.entity';
import { createMock } from '@golevelup/ts-jest';

describe('Business orders analytics service', () => {
  let analyticsService: BusinessOrderAnalyticsService;

  const stub: Order = {
    orderId: '1',
    placedAt: new Date(),
    confirmationCode: '1',
    modifiedAt: new Date(),
    courierTip: 3,
    subTotal: 9,
    total: 10,
    notes: 'notes',
    shippingAddress: 'street',
    status: new OrderStatus(),
    courier: new Courier(),
    payment: new Payment(),
    customer: new Customer(),
    business: new BusinessHq(),
    orderDetails: null,
  };

  const dataStub = [stub];

  const paginatedBusinessessData = {
    data: dataStub,
    page: 1,
    totalResults: dataStub.length,
    totalPages: Math.ceil(dataStub.length / 10),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        BusinessOrderAnalyticsService,
        {
          provide: getRepositoryToken(Order),
          useValue: {
            findAndCount: jest
              .fn()
              .mockReturnValue([dataStub, dataStub.length]),
          },
        },
      ],
    })
      .useMocker(createMock)
      .compile();

    analyticsService = moduleRef.get<BusinessOrderAnalyticsService>(
      BusinessOrderAnalyticsService
    );
  });

  it('should be defined', () => {
    expect(analyticsService).toBeDefined();
  });

  describe('Search orders', () => {
    it('Should return business orders analytics', async () => {
      const search = {
        searchValue: 'a',
        page: 1,
        limit: 1,
      };

      expect(await analyticsService.getAnalytics(search, '1')).toEqual(
        paginatedBusinessessData
      );
    });
  });
});

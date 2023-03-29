import { EntityRepository } from '@mikro-orm/core';
import { Test } from '@nestjs/testing';
import { MailService } from '../../notifications/mail/mail.service';
import { BusinessService } from '../services/business.service';
import {
  BusinessClassificationStub,
  businessesStub,
  businessModificationDtoStub,
  businessStub,
  completeBusinessCreationDTO,
  initialBusinessCreationDtoStub,
  paginatedBusinessessData,
} from './business.stubs';

describe('BusinessService', () => {
  let businessService: BusinessService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        BusinessService,
        {
          provide: 'BusinessHqRepository',
          useValue: {
            findOne: jest.fn().mockResolvedValue(businessStub),
            create: jest.fn().mockReturnValue(businessStub),
            persistAndFlush: jest.fn().mockReturnValue(true),
            findAndCount: jest
              .fn()
              .mockReturnValue([businessesStub, businessesStub.length]),
            flush: jest.fn().mockReturnValue(true),
          },
        },
        {
          provide: 'BusinessClassificationRepository',
          useValue: {
            find: jest.fn().mockReturnValue(BusinessClassificationStub),
          },
        },
        MailService,
        {
          provide: MailService,
          useValue: {
            sendBusinessConfirmation: jest.fn(),
          },
        },
      ],
    }).compile();

    businessService = moduleRef.get<BusinessService>(BusinessService);
  });

  describe('Submit business', () => {
    it('should save partial business', async () => {
      const result = {
        ...businessStub,
      };

      expect(
        await businessService.initialCreation(initialBusinessCreationDtoStub)
      ).toEqual(result);
    });
  });

  describe('Complete business creation', () => {
    it('Should modify businessess', async () => {
      const result = {
        ...businessStub,
      };

      expect(
        await businessService.completeBusinessCreation(
          'a',
          completeBusinessCreationDTO
        )
      ).toEqual(result);
    });
  });

  describe('Get businessess', () => {
    it('Should return businessess', async () => {
      const businessSearch = {
        categories: ['a'],
        page: 1,
        pageSize: 1,
      };

      expect(await businessService.search(businessSearch)).toEqual(
        paginatedBusinessessData
      );
    });
  });
});

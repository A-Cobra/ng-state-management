import { EntityRepository } from '@mikro-orm/core';
import { Test } from '@nestjs/testing';
import { MailService } from '../../notifications/mail/mail.service';
import { BusinessController } from '../controllers/business.controller';
import { BusinessSearchDto } from '../dto/business-search.dto';
import { BusinessClassification } from '../entities/business-classification.entity';
import { BusinessHq } from '../entities/business.entity';
import { BusinessService } from '../services/business.service';
import {
  businessesStub,
  businessModificationDtoStub,
  businessStub,
  completeBusinessCreationDTO,
  initialBusinessCreationDtoStub,
  paginatedBusinessessData,
} from './business.stubs';
import { createMock } from '@golevelup/ts-jest';

describe('BusinessController', () => {
  let businessController: BusinessController;
  let businessService: BusinessService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BusinessController],
      providers: [
        BusinessService,
        {
          provide: 'BusinessHqRepository',
          useClass: EntityRepository<BusinessHq>,
        },
        {
          provide: 'BusinessClassificationRepository',
          useClass: EntityRepository<BusinessClassification>,
        },
        {
          provide: 'MailService',
          useClass: MailService,
        },
      ],
    })
      .useMocker(createMock)
      .compile();

    businessService = moduleRef.get<BusinessService>(BusinessService);
    businessController = moduleRef.get<BusinessController>(BusinessController);
  });

  describe('Submit business', () => {
    it('Should save partial business', async () => {
      const result = {
        ...businessStub,
      };

      jest
        .spyOn(businessService, 'initialCreation')
        .mockImplementation(async () => result);
      expect(
        await businessController.submitBusiness(initialBusinessCreationDtoStub)
      ).toEqual(result);
    });
  });

  describe('Complete business creation', () => {
    it('Should modify businessess', async () => {
      const result = {
        ...businessStub,
      };

      jest
        .spyOn(businessService, 'completeBusinessCreation')
        .mockImplementation(async () => result);
      expect(
        await businessController.completeBusinessCreation(
          'a',
          completeBusinessCreationDTO
        )
      ).toBe(result);
    });
  });

  describe('Modify business', () => {
    it('Should modify businessess', async () => {
      const result = {
        ...businessStub,
        ...businessModificationDtoStub,
      };

      jest
        .spyOn(businessService, 'modify')
        .mockImplementation(async () => result);
      expect(
        await businessController.modifyBusiness(
          'a',
          businessModificationDtoStub
        )
      ).toBe(result);
    });
  });

  describe('Get businessess', () => {
    it('Should return businessess', async () => {
      const result = {
        businessess: businessesStub,
        totalBusinessess: 1,
        totalPages: 1,
      };

      const businessSearch: BusinessSearchDto = {
        categories: ['a'],
        page: 1,
        pageSize: 1,
      };

      jest
        .spyOn(businessService, 'search')
        .mockImplementation(async () => paginatedBusinessessData);
      expect(await businessController.getBusinesses(businessSearch)).toBe(
        paginatedBusinessessData
      );
    });
  });
});

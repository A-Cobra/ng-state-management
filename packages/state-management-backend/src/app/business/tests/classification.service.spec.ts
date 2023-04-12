import { getRepositoryToken } from '@mikro-orm/nestjs';
import { ClassificationService } from '../services/classification.service';
import { BusinessClassification } from '../entities/business-classification.entity';
import {
  classificationDtoStub,
  classificationStub,
  classificationsStub,
  modifiedClassificationStub,
  modifyClassificationDtoStub,
  paginatedClassificationData,
} from './business.stubs';
import { Test } from '@nestjs/testing';

describe('ClassificationService', () => {
  let classificationService: ClassificationService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ClassificationService,
        {
          provide: getRepositoryToken(BusinessClassification),
          useValue: {
            findOne: jest.fn().mockResolvedValue(classificationStub),
            create: jest.fn().mockReturnValue(classificationStub),
            persistAndFlush: jest.fn().mockReturnValue(true),
            assign: jest.fn().mockReturnValue(modifiedClassificationStub),
            findAndCount: jest
              .fn()
              .mockReturnValue([
                classificationsStub,
                classificationsStub.length,
              ]),
            flush: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile();

    classificationService = moduleRef.get<ClassificationService>(
      ClassificationService
    );
  });

  describe('Create classification', () => {
    it('should save classification', async () => {
      expect(await classificationService.create(classificationDtoStub)).toEqual(
        classificationStub
      );
    });
  });

  describe('Get classifications', () => {
    it('Should return classifications', async () => {
      const classificationsSearch = {
        page: 1,
        pageSize: 1,
      };

      expect(await classificationService.get(classificationsSearch)).toEqual(
        paginatedClassificationData
      );
    });
  });

  describe('Modify classifications', () => {
    it('Should modify classification', async () => {
      expect(
        await classificationService.modify('9', modifyClassificationDtoStub)
      ).toEqual(modifiedClassificationStub);
    });
  });

  describe('Delete classification', () => {
    it('Should delete classification', async () => {
      const result = await classificationService.delete('9');
      expect(result.deleted).toEqual(true);
    });
  });
});

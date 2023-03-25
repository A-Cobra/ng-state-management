import { MikroORM } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { BranchesService } from '../services/branches.service';
import { BranchesController } from './branches.controller';
import { BranchRepositoryMock } from '../test/branch.repository.mock';
import { BranchesServiceMock } from '../test/branch.service.mock';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { BusinessBranch } from '../entities/businessBranch.entity';
import { createdBranchResponse } from '../test/mocks/branch-response.mock';

describe('BranchesController', () => {
  let controller: BranchesController;
  let pagination: PaginationDto;
  let service: BranchesService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BranchesController],
      providers: [
        {
          provide: BranchesService,
          useClass: BranchesServiceMock,
        },
        {
          provide: MikroORM,
          useValue: {},
        },
        {
          provide: getRepositoryToken(BranchesService),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<BranchesController>(BranchesController);
    service = module.get<BranchesService>(BranchesService);
  });

  beforeEach(() => {
    pagination = {
      page: 1,
      limit: 10,
    };
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all branches', async () => {
    const result = await controller.getAllBranches(pagination);
    expect(result.data.length).toEqual(3);
  });

  it('should return branches by business', async () => {
    const result = await controller.getBranchesByBusiness(
      '5f9f1b0b0b0b0b0b0b0b0b0b',
      pagination
    );
    expect(result.data.length).toEqual(3);
  });

  it('should return an empty array if businessId is not found', async () => {
    const result = await controller.getBranchesByBusiness(
      '5f9f1b0b0b0b0b0b0b0b0b0c',
      pagination
    );
    expect(result.data.length).toEqual(0);
  });

  it('should return a branch by id', async () => {
    const id = '632cbe18-ccc8-405e-a770-4b82e6399151';
    const result = await controller.getSingleBranch(id);
    expect(result.branchId).toEqual(id);
  });
});

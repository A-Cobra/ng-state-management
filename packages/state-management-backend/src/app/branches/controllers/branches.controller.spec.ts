import { MikroORM } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { BranchesService } from '../services/branches.service';
import { BranchesController } from './branches.controller';
import { BranchesServiceMock } from '../test/branch.service.mock';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { CreateBranchDto } from '../dto/create-branch.dto';
import { BusinessBranch } from '../entities/businessBranch.entity';
import { Business_HQ } from '../../business/entities/business.entity';
import { UpdateBranchDto } from '../dto/update-branch.dto';

describe('BranchesController', () => {
  let controller: BranchesController;
  let pagination: PaginationDto;
  let branch: CreateBranchDto;
  let service: BranchesService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BranchesController],
      providers: [
        {
          provide: MikroORM,
          useValue: {},
        },
        {
          provide: getRepositoryToken(BranchesService),
          useValue: {},
        },
        {
          provide: BranchesService,
          useClass: BranchesServiceMock,
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
    branch = {
      name: 'Branch 1',
      address: 'Address 1',
      image: 'Image 1',
      longitude: '1',
      latitude: '1',
      openingTime: '04:00 AM',
      closeTime: '04:00 PM',
      contactEmail: 'example@gmail.com',
      contactPhoneNumber: '1234567890',
    };
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all branches', async () => {
    jest.spyOn(service, 'getAllBranches');
    const result = await controller.getAllBranches(pagination);
    expect(result.data.length).toEqual(3);
  });

  it('should return branches by business', async () => {
    jest.spyOn(service, 'getBranchesByBusiness');
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

  it('should call create branch with correct params', async () => {
    const businessId = '5f9f1b0b0b0b0b0b0b0b0b0b';

    const createSpy = jest.spyOn(service, 'create');
    await controller.create(businessId, branch);
    expect(createSpy).toHaveBeenCalledWith(businessId, branch);
  });

  it('should return a created branch', async () => {
    const businessId = '5f9f1b0b0b0b0b0b0b0b0b0b';
    const expectedBranch: BusinessBranch = {
      ...branch,
      branchId: '6f9f1b0b0b0b0b0b0b0b0b0b',
      deleted: false,
      businessId: { business_id: businessId } as Business_HQ,
    };
    jest.spyOn(service, 'create');
    const result = await controller.create(businessId, branch);
    expect(result).toEqual(expectedBranch);
  });

  it('should update a branch', async () => {
    const branchId = '632cbe18-ccc8-405e-a770-4b82e6399151';
    const fieldsToUpdate: UpdateBranchDto = {
      name: 'Branch 1 Updated',
      address: 'Address 1 Updated',
    };
    jest.spyOn(service, 'update');
    const branchUpdated = await controller.update(branchId, fieldsToUpdate);
    expect(branchUpdated.name).toEqual(fieldsToUpdate.name);
  });

  it('should delete a branch', async () => {
    const branchId = '632cbe18-ccc8-405e-a770-4b82e6399151';
    jest.spyOn(service, 'delete');
    const branchDeleted = await controller.delete(branchId);
    expect(branchDeleted?.['deleted']).toEqual(true);
  });

  it('should search branches by name', async () => {
    const search = 'Mock Data';
    const result = await controller.searchBranches(search, pagination);
    expect(result.data.length).toEqual(3);
  });
});

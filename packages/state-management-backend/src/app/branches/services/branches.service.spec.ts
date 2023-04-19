import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { BusinessService } from '../../business/services/business.service';
import { BusinessBranch } from '../entities/business-branch.entity';
import { BranchesService } from './branches.service';
import { mockBranchesResponse } from '../test/mocks/branch-response.mock';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { BusinessHq } from '../../business/entities/business.entity';
import { businessStub } from '../../business/tests/business.stubs';

describe('BranchesService', () => {
  let branchService: BranchesService;
  let businessService: BusinessService;
  let pagination: PaginationDto;
  const mockBranchRepository = {
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    persistAndFlush: jest.fn(),
    create: jest.fn(),
    assign: jest.fn(),
    flush: jest.fn(),
  };
  const mockBusinessRepository = {};

  const mockBusinessService = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    pagination = {
      page: 1,
      limit: 10,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BusinessService,
          useValue: mockBusinessService,
        },
        BranchesService,
        {
          provide: getRepositoryToken(BusinessBranch),
          useValue: mockBranchRepository,
        },
        {
          provide: getRepositoryToken(BusinessHq),
          useValue: mockBusinessRepository,
        },
      ],
    }).compile();

    branchService = module.get<BranchesService>(BranchesService);
    businessService = module.get<BusinessService>(BusinessService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all branches', async () => {
    const mockServiceBranches = [
      mockBranchesResponse.data,
      mockBranchesResponse.data.length,
    ];
    mockBranchRepository.findAndCount.mockReturnValueOnce(mockServiceBranches);
    const result = await branchService.getAllBranches(pagination);
    expect(mockBranchRepository.findAndCount).toBeCalledTimes(1);
    expect(result).toEqual(mockBranchesResponse);
  });

  it('should return branches by business', async () => {
    jest.spyOn(businessService, 'findById').mockResolvedValueOnce(businessStub);
    const mockServiceBranches = [
      mockBranchesResponse.data,
      mockBranchesResponse.data.length,
    ];
    mockBranchRepository.findAndCount.mockReturnValueOnce(mockServiceBranches);
    const result = await branchService.getBranchesByBusiness('123', pagination);
    expect(mockBranchRepository.findAndCount).toBeCalledTimes(1);
    expect(result).toEqual(mockBranchesResponse);
  });

  it('should return a branch by id', async () => {
    const mockServiceBranch = mockBranchesResponse.data[0];
    mockBranchRepository.findOne.mockReturnValueOnce(mockServiceBranch);
    const result = await branchService.findById('123');
    expect(mockBranchRepository.findOne).toBeCalledWith({
      branchId: '123',
      deleted: false,
    });
    expect(result).toEqual(mockServiceBranch);
  });

  it('should search branches by name', async () => {
    const filterBranches = mockBranchesResponse.data.filter((branch) =>
      branch.name.includes('Mock Data')
    );
    const mockServiceBranches = filterBranches;
    mockBranchRepository.find.mockResolvedValueOnce(mockServiceBranches);
    const result = await branchService.search('Mock Data', pagination);
    expect(mockBranchRepository.find).toBeCalledTimes(1);
    expect(result.data.length).toEqual(mockServiceBranches.length);
  });

  it('should create a branch', async () => {
    const newBranch = {
      address: 'test',
      closeTime: '12:00',
      contactEmail: 'branch@gmail.com',
      contactPhoneNumber: '123456789',
      image: 'test.jpg',
      latitude: '123',
      longitude: '123',
      name: 'new test',
      openingTime: '10:00',
    };
    const createdBranch = {
      branchId: '123',
      ...newBranch,
      business: { userId: '123' },
    };
    const responseBranch = {
      branchId: '123',
      ...newBranch,
      userId: '123',
    };
    jest.spyOn(businessService, 'findById').mockResolvedValueOnce(businessStub);
    mockBranchRepository.create.mockReturnValueOnce(createdBranch);
    mockBranchRepository.persistAndFlush.mockResolvedValueOnce(true);
    const result = await branchService.create('123', newBranch);
    expect(mockBranchRepository.create).toBeCalledTimes(1);
    expect(mockBranchRepository.persistAndFlush).toBeCalledTimes(1);
    expect(result).toEqual(responseBranch);
  });

  it('should update a branch', async () => {
    const mockServiceBranch = mockBranchesResponse.data[0];
    const updateBranchDto = {
      address: 'test updated',
      closeTime: '12:00',
    };
    const updateBranch = {
      ...mockServiceBranch,
      ...updateBranchDto,
    };
    mockBranchRepository.findOne.mockReturnValueOnce(mockServiceBranch);
    mockBranchRepository.assign.mockImplementationOnce(
      (branchToUpdate, branch) => {
        Object.assign(branchToUpdate, branch);
        return branchToUpdate;
      }
    );
    mockBranchRepository.flush.mockResolvedValueOnce(undefined);
    const result = await branchService.update(
      '632cbe18-ccc8-405e-a770-4b82e6399151',
      updateBranchDto
    );
    expect(mockBranchRepository.findOne).toBeCalledWith({
      branchId: '632cbe18-ccc8-405e-a770-4b82e6399151',
    });
    expect(mockBranchRepository.assign).toBeCalledWith(
      mockServiceBranch,
      updateBranchDto
    );
    expect(mockBranchRepository.flush).toBeCalledTimes(1);
    expect(result).toEqual(updateBranch);
  });

  it('should delete a branch', async () => {
    const mockServiceBranch = mockBranchesResponse.data[0];
    mockBranchRepository.findOne.mockReturnValueOnce(mockServiceBranch);
    await branchService.delete('632cbe18-ccc8-405e-a770-4b82e6399151');
    expect(mockBranchRepository.findOne).toBeCalledWith({
      branchId: '632cbe18-ccc8-405e-a770-4b82e6399151',
    });
    expect(mockBranchRepository.persistAndFlush).toHaveBeenCalledWith(
      mockServiceBranch
    );
    expect(mockServiceBranch?.['deleted']).toEqual(true);
  });
});

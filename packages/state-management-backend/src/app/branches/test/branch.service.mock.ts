import { BusinessHq } from '../../business/entities/business.entity';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { PaginationResult } from '../../common/interfaces/pagination-result.interface';
import { CreateBranchDto } from '../dto/create-branch.dto';
import { UpdateBranchDto } from '../dto/update-branch.dto';
import { BusinessBranch } from '../entities/business-branch.entity';
import { mockBranchesResponse } from './mocks/branch-response.mock';

export class BranchesServiceMock {
  getAllBranches() {
    return mockBranchesResponse;
  }

  getBranchesByBusiness(id: string) {
    const idBusiness = '5f9f1b0b0b0b0b0b0b0b0b0b';
    if (id === idBusiness) {
      return mockBranchesResponse;
    }
    return { data: [] };
  }

  findById(id: string) {
    const branchMock = mockBranchesResponse.data.find(
      (branch) => branch.branchId === id
    );
    return branchMock || null;
  }

  create(businessId: string, createBranchDto: CreateBranchDto): BusinessBranch {
    return {
      ...createBranchDto,
      branchId: '6f9f1b0b0b0b0b0b0b0b0b0b',
      deleted: false,
      businessId: { businessId: businessId } as BusinessHq,
    };
  }

  update(id: string, updateBranchDto: UpdateBranchDto) {
    const branchMock = mockBranchesResponse.data.find(
      (branch) => branch.branchId === id
    );
    if (branchMock) {
      return {
        ...branchMock,
        ...updateBranchDto,
      };
    }
    return null;
  }

  delete(id: string) {
    const branchMock = mockBranchesResponse.data.find(
      (branch) => branch.branchId === id
    );
    if (branchMock) {
      return {
        ...branchMock,
        deleted: true,
      };
    }
    return null;
  }

  search(
    q: string,
    pagination: PaginationDto
  ): PaginationResult<BusinessBranch> {
    const branches = mockBranchesResponse.data.filter((branch) =>
      branch.name.toLowerCase().includes(q.toLowerCase())
    );
    return {
      data: branches,
      totalResults: 1,
      page: pagination.page,
      totalPages: 1,
    };
  }
}

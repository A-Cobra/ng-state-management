import { mockBranchesResponse } from './mocks/branch-response.mock';

export class BranchesServiceMock {
  async getAllBranches() {
    return mockBranchesResponse;
  }

  async getBranchesByBusiness(id: string) {
    const idBusiness = '5f9f1b0b0b0b0b0b0b0b0b0b';
    if (id === idBusiness) {
      return mockBranchesResponse;
    }
    return { data: [] };
  }

  async findById(id: string) {
    const branchMock = mockBranchesResponse.data.find(
      (branch) => branch.branchId === id
    );
    return branchMock || null;
  }
}

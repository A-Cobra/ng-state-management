import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { CreateBranchDto } from "../dto/create-branch.dto";
import { BusinessBranch } from "../entities/businessBranch.entity";

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(BusinessBranch)
    private readonly branchRepository: EntityRepository<BusinessBranch>
  ) {}

  async findAll(): Promise<BusinessBranch[]> {
    return this.branchRepository.findAll();
  }

  async create(branch: CreateBranchDto): Promise<BusinessBranch> {
    return this.branchRepository.create(branch);
  }
}

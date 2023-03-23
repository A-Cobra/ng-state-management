import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BusinessService } from '../../business/services/business.service';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { PaginationResult } from '../../common/interfaces/pagination-result.interface';
import { CreateBranchDto } from '../dto/create-branch.dto';
import { BusinessBranch } from '../entities/businessBranch.entity';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(BusinessBranch)
    private readonly branchRepository: EntityRepository<BusinessBranch>,
    private readonly businessService: BusinessService
  ) {}

  async findAll(
    id: string,
    paginationDto: PaginationDto
  ): Promise<PaginationResult<BusinessBranch>> {
    const business = await this.businessService.findById();
    if (!business) {
      throw new NotFoundException('Business not found');
    }
    const { page, limit } = paginationDto;
    const [data, total] = await this.branchRepository.findAndCount(
      { businessId: business },
      { offset: (page - 1) * limit, limit: limit }
    );
    const totalPages = Math.ceil(total / limit);
    return {
      data,
      totalResults: total,
      page: Number(page),
      totalPages,
    };
  }

  async create(
    businessId: string,
    branch: CreateBranchDto
  ): Promise<BusinessBranch> {
    const business = await this.businessService.findById();
    if (!business) {
      throw new NotFoundException('Business not found');
    }
    const newBranch = this.branchRepository.create(branch);
    newBranch.businessId = business;
    await this.branchRepository.persistAndFlush(newBranch);
    return newBranch;
  }

  async delete(id: string): Promise<void> {
    const branch = await this.branchRepository.findOne({ branchId: id });
    if (!branch) {
      throw new NotFoundException('Branch not found');
    }
    branch.deleted = true;
    await this.branchRepository.persistAndFlush(branch);
  }
}

import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { PaginationResult } from '../../common/interfaces/pagination-result.interface';
import { CreateBranchDto } from '../dto/create-branch.dto';
import { BusinessBranch } from '../entities/businessBranch.entity';
import { BranchesService } from '../services/branches.service';

@Controller({
  path: 'business',
  version: '1',
})
export class BranchesController {
  constructor(private readonly branchesServices: BranchesService) {}

  @Get(':id/branches')
  findAll(
    @Param('id') id: string,
    @Query() paginationDto: PaginationDto
  ): Promise<PaginationResult<BusinessBranch>> {
    return this.branchesServices.findAll(id, paginationDto);
  }

  @Post(':businessId/branches')
  @HttpCode(201)
  create(
    @Param('businessId') businessId: string,
    @Body() branch: CreateBranchDto
  ) {
    return this.branchesServices.create(businessId, branch);
  }
}

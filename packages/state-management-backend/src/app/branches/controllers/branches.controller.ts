import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { PaginationResult } from '../../common/interfaces/pagination-result.interface';
import { CreateBranchDto } from '../dto/create-branch.dto';
import { UpdateBranchDto } from '../dto/update-branch.dto';
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

  @Put('branches/:id')
  update(@Param('id') id: string, @Body() branch: UpdateBranchDto) {
    return this.branchesServices.update(id, branch);
  }

  @Delete('branches/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return this.branchesServices.delete(id);
  }
}

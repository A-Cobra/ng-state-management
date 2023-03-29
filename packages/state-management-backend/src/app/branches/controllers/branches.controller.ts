import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
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

  @UseGuards(JwtAuthGuard)
  @Get('branches')
  getAllBranches(
    @Query() paginationDto: PaginationDto
  ): Promise<PaginationResult<BusinessBranch>> {
    return this.branchesServices.getAllBranches(paginationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('search/branches')
  searchBranches(@Query('q') q: string, @Query() paginationDto: PaginationDto) {
    return this.branchesServices.search(q, paginationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':businessId/branches')
  getBranchesByBusiness(
    @Param('businessId') businessId: string,
    @Query() paginationDto: PaginationDto
  ): Promise<PaginationResult<BusinessBranch>> {
    return this.branchesServices.getBranchesByBusiness(
      businessId,
      paginationDto
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('branches/:id')
  getSingleBranch(@Param('id') id: string) {
    return this.branchesServices.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':businessId/branches')
  @HttpCode(201)
  create(
    @Param('businessId') businessId: string,
    @Body() branch: CreateBranchDto
  ) {
    return this.branchesServices.create(businessId, branch);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('branches/:id')
  update(@Param('id') id: string, @Body() branch: UpdateBranchDto) {
    return this.branchesServices.update(id, branch);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('branches/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return this.branchesServices.delete(id);
  }
}

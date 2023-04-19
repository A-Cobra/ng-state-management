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
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { PaginationResult } from '../../common/interfaces/pagination-result.interface';
import { CreateBranchDto } from '../dto/create-branch.dto';
import { UpdateBranchDto } from '../dto/update-branch.dto';
import { BusinessBranch } from '../entities/business-branch.entity';
import { BranchesService } from '../services/branches.service';

@ApiTags('Branches')
@Controller({
  path: 'branches',
  version: '1',
})
export class BranchesController {
  constructor(private readonly branchesServices: BranchesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllBranches(
    @Query() paginationDto: PaginationDto
  ): Promise<PaginationResult<BusinessBranch>> {
    return this.branchesServices.getAllBranches(paginationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/search')
  searchBranches(
    @Query('name') name: string,
    @Query() paginationDto: PaginationDto
  ) {
    return this.branchesServices.search(name, paginationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('business/:businessId')
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
  @Get(':idBranch')
  getSingleBranch(@Param('idBranch') id: string) {
    return this.branchesServices.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':businessId')
  @HttpCode(201)
  create(
    @Param('businessId') businessId: string,
    @Body() branch: CreateBranchDto
  ) {
    return this.branchesServices.create(businessId, branch);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() branch: UpdateBranchDto) {
    return this.branchesServices.update(id, branch);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return this.branchesServices.delete(id);
  }
}

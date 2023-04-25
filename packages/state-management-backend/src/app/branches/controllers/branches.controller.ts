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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { PaginationResult } from '../../common/interfaces/pagination-result.interface';
import { CreateBranchDto } from '../dto/create-branch.dto';
import { UpdateBranchDto } from '../dto/update-branch.dto';
import { BusinessBranch } from '../entities/business-branch.entity';
import { BranchesService } from '../services/branches.service';
import { Authorized } from '../../auth/decorator/authorized.decorator';
import { ValidRoles } from '../../auth/interfaces/valid-roles.type';

@ApiTags('Branches')
@Controller({
  path: 'branches',
  version: '1',
})
export class BranchesController {
  constructor(private readonly branchesServices: BranchesService) {}

  @Authorized(ValidRoles.business)
  @Get()
  getAllBranches(
    @Query() paginationDto: PaginationDto
  ): Promise<PaginationResult<BusinessBranch>> {
    return this.branchesServices.getAllBranches(paginationDto);
  }

  @Authorized(ValidRoles.business)
  @Get('/search')
  searchBranches(
    @Query('name') name: string,
    @Query() paginationDto: PaginationDto
  ) {
    return this.branchesServices.search(name, paginationDto);
  }

  @Authorized(ValidRoles.business)
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

  @Authorized(ValidRoles.business)
  @Get(':idBranch')
  getSingleBranch(@Param('idBranch') id: string) {
    return this.branchesServices.findById(id);
  }

  @Authorized(ValidRoles.business)
  @Post(':businessId')
  @HttpCode(201)
  create(
    @Param('businessId') businessId: string,
    @Body() branch: CreateBranchDto
  ) {
    return this.branchesServices.create(businessId, branch);
  }

  @Authorized(ValidRoles.business)
  @Patch(':id')
  update(@Param('id') id: string, @Body() branch: UpdateBranchDto) {
    return this.branchesServices.update(id, branch);
  }

  @Authorized(ValidRoles.business)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return this.branchesServices.delete(id);
  }
}

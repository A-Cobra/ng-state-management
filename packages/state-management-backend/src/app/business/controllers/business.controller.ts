import {
  Body,
  Controller,
  Post,
  Patch,
  Delete,
  Get,
  Put,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BusinessModificationDto } from '../dto/business-modification.dto';
import { BusinessSearchDto } from '../dto/business-search.dto';
import { CompleteBusinessCreationDTO } from '../dto/complete-creation.dto';
import { InitialBusinessCreationDto } from '../dto/initial-creation.dto';
import { BusinessService } from '../services/business.service';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { Authorized } from '../../auth/decorator/authorized.decorator';
import { ValidRoles } from '../../auth/interfaces/valid-roles.type';

@ApiTags('Businessesss')
@UseGuards(JwtAuthGuard)
@Controller('businessess')
export class BusinessController {
  constructor(private readonly businesService: BusinessService) {}

  @Post()
  @Authorized(ValidRoles.admin)
  submitBusiness(@Body() dto: InitialBusinessCreationDto) {
    return this.businesService.initialCreation(dto);
  }

  @Patch(':businessId')
  completeBusinessCreation(
    @Param('businessId') businessId: string,
    @Body() dto: CompleteBusinessCreationDTO
  ) {
    return this.businesService.completeBusinessCreation(businessId, dto);
  }

  @Delete(':businessId')
  @Authorized(ValidRoles.admin)
  deleteBusiness(@Param('businessId') businessId: string) {
    return this.businesService.delete(businessId);
  }

  @Put(':businessId')
  @Authorized(ValidRoles.admin)
  modifyBusiness(
    @Param('businessId') businessId: string,
    businessModificationDto: BusinessModificationDto
  ) {
    return this.businesService.modify(businessId, businessModificationDto);
  }

  @Patch(':businessId/approval')
  @Authorized(ValidRoles.admin)
  approveBusiness(@Param('businessId') businessId: string) {
    this.businesService.approveBusiness(businessId);
  }

  @Get()
  @Authorized(ValidRoles.admin)
  getBusinesses(@Query() businessSearch: BusinessSearchDto) {
    return this.businesService.search(businessSearch);
  }
}

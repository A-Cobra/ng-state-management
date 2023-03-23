import { Body, Controller, Post, Patch, Delete, Get, Put, Param } from '@nestjs/common';
import { BusinessModificationDto } from '../dto/business-modification.dto';
import { BusinessSearchDto } from '../dto/business-search.dto';
import { CompleteBusinessCreationDTO } from '../dto/complete-creation.dto';
import { InitialBusinessCreationDto } from '../dto/initial-creation.dto';
import { BusinessService } from '../services/business.service';

@Controller('business')
export class BusinessController {
    constructor(
        private readonly businesService: BusinessService,
    ){}

    @Post()
    submitBusiness(@Body() dto: InitialBusinessCreationDto) {
        return this.businesService.initialCreation(dto);
    }

    @Patch(':businessId')
    completeBusinessCreation(@Param('businessId') businessId: string, @Body() dto: CompleteBusinessCreationDTO) {
        return this.businesService.CompleteBusinessCreation(dto);
    }

    @Delete(':businessId')
    deleteBusiness(@Param('businessId') businessId: string) {
        return this.businesService.delete(businessId);
    }

    @Put(':businessId')
    modifyBusiness(@Param('businessId') businessId: string, businessModificationDto: BusinessModificationDto) {
        return this.businesService.modify(businessId, businessModificationDto);
    }

    @Patch(':businessId/approval')
    approveBusiness(@Param('businessId') businessId: string) {
        this.businesService.approveBusiness(businessId);
    }

    @Get()
    getBusinesses(businessSearch: BusinessSearchDto) {
        return this.businesService.search(businessSearch);
    }
}

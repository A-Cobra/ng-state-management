import { Body, Controller, Post, Patch, Delete, Get } from '@nestjs/common';
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

    @Patch()
    completeBusinessCreation(@Body() dto: CompleteBusinessCreationDTO) {
        return this.businesService.CompleteBusinessCreation(dto);
    }

    @Delete("/businessId")
    deleteBusiness(businessId: string) {
        return this.businesService.delete(businessId);
    }

    @Get()
    getBusinesses(businessSearch: BusinessSearchDto) {
        return this.businesService.search(businessSearch);
    }
}

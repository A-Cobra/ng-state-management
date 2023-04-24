import {
  Body,
  Controller,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BusinessSalesAnalyticsDto } from '../dtos/business-sales-analytics.dto';
import { BusinessSalesAnalyticsService } from '../services/business-sales-analytics.service';

@Controller('sales')
@UsePipes(new ValidationPipe({ transform: true }))
export class BusinessSalesAnalyticsController {
  constructor(private readonly service: BusinessSalesAnalyticsService) {}

  @Get('analytics')
  getBusinessSalesAnalytics(@Body() dto: BusinessSalesAnalyticsDto) {
    return this.service.search(dto);
  }
}

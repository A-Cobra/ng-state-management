import { Body, Controller, Get } from '@nestjs/common';
import { businessOrdersAnalyticsDto } from '../dtos/business-orders-analytics.dto';
import { BusinessOrderAnalyticsService } from '../services/business-orders-analytics.service';

@Controller('businessess')
export class BusinessOrderAnalyticsController {
  constructor(
    private readonly businessOrdersAnalyticsService: BusinessOrderAnalyticsService
  ) {}

  @Get(':businessId/ordersAnalytics')
  getBusinessOrdersAnalytics(@Body() dto: businessOrdersAnalyticsDto) {
    return this.businessOrdersAnalyticsService.getAnalytics(dto);
  }
}

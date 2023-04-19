import {
  Body,
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BusinessOrdersAnalyticsDto } from '../dtos/business-orders-analytics.dto';
import { BusinessOrderAnalyticsService } from '../services/business-orders-analytics.service';

@Controller('businessess')
@UsePipes(new ValidationPipe({ transform: true }))
export class BusinessOrderAnalyticsController {
  constructor(
    private readonly businessOrdersAnalyticsService: BusinessOrderAnalyticsService
  ) {}

  @Get(':businessId/ordersAnalytics')
  getBusinessOrdersAnalytics(
    @Body() dto: BusinessOrdersAnalyticsDto,
    @Param('businessId') businessId: string
  ) {
    return this.businessOrdersAnalyticsService.getAnalytics(dto, businessId);
  }
}

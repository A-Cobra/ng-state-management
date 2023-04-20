import {
  Body,
  Controller,
  Get,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BusinessOrdersAnalyticsDto } from '../dtos/business-orders-analytics.dto';
import { BusinessOrderAnalyticsService } from '../services/business-orders-analytics.service';
import { GetUser } from '../../auth/decorator/get-user.decorator';
import { JwtInfo } from '../../auth/interfaces/jwtinfo.type';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@Controller('businessess')
@UsePipes(new ValidationPipe({ transform: true }))
export class BusinessOrderAnalyticsController {
  constructor(
    private readonly businessOrdersAnalyticsService: BusinessOrderAnalyticsService
  ) {}

  @Get('ordersAnalytics/me')
  @UseGuards(JwtAuthGuard)
  getBusinessOrdersAnalytics(
    @Body() dto: BusinessOrdersAnalyticsDto,
    @GetUser() userInfo: JwtInfo
  ) {
    return this.businessOrdersAnalyticsService.getAnalytics(dto, userInfo.sub);
  }
}

import { Module } from '@nestjs/common';
import { BusinessSalesAnalyticsService } from './services/business-sales-analytics.service';
import { BusinessOrderAnalyticsService } from './services/business-orders-analytics.service';
import { BusinessOrderAnalyticsController } from './controllers/BusinessOrderAnalytics.controller';
import { BusinessSalesAnalyticsController } from './controllers/BusinessSalesAnalytics.controller';
import { Order } from '../orders/entities/order.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([Order])],
  providers: [BusinessSalesAnalyticsService, BusinessOrderAnalyticsService],
  controllers: [
    BusinessOrderAnalyticsController,
    BusinessSalesAnalyticsController,
  ],
})
export class AnalyticsModule {}

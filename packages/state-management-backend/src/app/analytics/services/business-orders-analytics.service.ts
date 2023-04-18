import { InjectRepository } from '@mikro-orm/nestjs';
import { businessOrdersAnalyticsDto } from '../dtos/business-orders-analytics.dto';

export class BusinessOrderAnalyticsService {
  constructor() {}
  getAnalytics(dto: businessOrdersAnalyticsDto) {
    throw new Error('Method not implemented.');
  }
}

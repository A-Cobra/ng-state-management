import { InjectRepository } from '@mikro-orm/nestjs';
import { BusinessOrdersAnalyticsDto } from '../dtos/business-orders-analytics.dto';
import { Order } from '../../orders/entities/order.entity';
import { EntityRepository, FilterQuery, QueryOrder } from '@mikro-orm/core';

export class BusinessOrderAnalyticsService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: EntityRepository<Order>
  ) {}

  async getAnalytics(dto: BusinessOrdersAnalyticsDto, businessId: string) {
    const queryOptions: FilterQuery<Order> = {
      $and: [{ business: { businessId } }],
    };

    if (dto.endTime) {
      queryOptions.$and.push({ placedAt: { $lte: dto.endTime } });
    }

    if (dto.startTime) {
      queryOptions.$and.push({ placedAt: { $gte: dto.startTime } });
    }

    if (dto.searchValue) {
      queryOptions.$and.push({
        $or: [
          { customer: { username: { $ilike: `%${dto.searchValue}%` } } },
          { customer: { lastname: { $ilike: `%${dto.searchValue}%` } } },
          { customer: { name: { $ilike: `%${dto.searchValue}%` } } },
          {
            orderDetails: {
              product: { productName: { $ilike: `%${dto.searchValue}%` } },
            },
          },
          { status: { name: { $ilike: `%${dto.searchValue}%` } } },
        ],
      });
    }

    const [data, total] = await this.orderRepository.findAndCount(
      queryOptions,
      {
        offset: (dto.page - 1) * dto.limit,
        limit: dto.limit,
        orderBy: { placedAt: dto.sortAsc ? QueryOrder.ASC : QueryOrder.DESC },
        populate: ['status', 'orderDetails.product'],
      }
    );

    const totalPages = Math.ceil(total / dto.limit);
    return {
      data,
      page: dto.page,
      totalResults: total,
      totalPages,
    };
  }
}

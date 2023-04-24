import { Injectable } from '@nestjs/common';
import { BusinessSalesAnalyticsDto } from '../dtos/business-sales-analytics.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Order } from '../../orders/entities/order.entity';
import { EntityRepository, FilterQuery } from '@mikro-orm/core';

@Injectable()
export class BusinessSalesAnalyticsService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: EntityRepository<Order>
  ) {}

  async search(dto: BusinessSalesAnalyticsDto) {
    const queryOptions: FilterQuery<Order> = {
      $and: [{ status: { name: 'delivered' } }],
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
          { business: { name: { $ilike: `%${dto.searchValue}%` } } },
          {
            business: {
              classifications: { name: { $ilike: `%${dto.searchValue}%` } },
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
        populate: ['status', 'business'],
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

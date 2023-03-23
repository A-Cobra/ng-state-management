import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Business_HQ } from '../entities/business.entity';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business_HQ)
    private readonly businessRepository: EntityRepository<Business_HQ>
  ) {}
  findById(): Promise<Business_HQ> {
    return this.businessRepository.findOne({
      business_id: '6c84fb90-12c4-11e1-840d-7b25c5ee775a',
    });
  }
}

import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BusinessClassification } from '../entities/business-classification.entity';
import { EntityRepository } from '@mikro-orm/core';
import { BusinessClassificationDto } from '../dto/business-classification.dto';
import { classificationSearchDto } from '../dto/classification-search.dto';
import { PaginationResult } from '../../common/interfaces/pagination-result.interface';

@Injectable()
export class ClassificationService {
  constructor(
    @InjectRepository(BusinessClassification)
    private readonly repository: EntityRepository<BusinessClassification>
  ) {}

  async create(
    dto: BusinessClassificationDto
  ): Promise<BusinessClassification> {
    const classification = this.repository.create(dto);

    this.repository.persistAndFlush(classification);

    return classification;
  }

  async modify(
    businessClassificationId: string,
    dto: BusinessClassificationDto
  ) {
    const classification = await this.find(businessClassificationId);

    const modified = this.repository.assign(classification, dto);

    this.repository.flush();

    return modified;
  }

  async find(
    businessClassificationId: string
  ): Promise<BusinessClassification> {
    const classification = await this.repository.findOne({
      businessClassificationId,
      deleted: false,
    });

    if (!classification) throw new NotFoundException();

    return classification;
  }

  async delete(businessClassificationId: string) {
    const classification = await this.find(businessClassificationId);

    classification.deleted = true;

    this.repository.persistAndFlush(classification);

    return classification;
  }

  async get(
    dto: classificationSearchDto
  ): Promise<PaginationResult<BusinessClassification>> {
    const result = await this.repository.findAndCount(
      {
        name: { $ilike: `%${dto.name}%` },
        deleted: false,
      },
      {
        offset: (dto.page - 1) * dto.pageSize,
        limit: dto.pageSize,
      }
    );

    const [businessess, totalBusinessess] = result;
    const totalPages = Math.ceil(totalBusinessess / dto.pageSize);

    return {
      data: businessess,
      page: dto.page,
      totalResults: totalBusinessess,
      totalPages: totalPages,
    };
  }
}

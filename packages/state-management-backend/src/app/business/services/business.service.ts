import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BusinessSearchDto } from '../dto/business-search.dto';
import { CompleteBusinessCreationDTO } from '../dto/complete-creation.dto';
import { InitialBusinessCreationDto } from '../dto/initial-creation.dto';
import { BusinessHq } from '../entities/business.entity';
import { BusinessClassification } from '../entities/business_classification.entity';
import { BusinessessResult } from '../interfaces/businessess-result';

@Injectable()
export class BusinessService {
    constructor(
        @InjectRepository(BusinessHq)
        private readonly businessRepository: EntityRepository<BusinessHq>,
        @InjectRepository(BusinessClassification)
        private readonly businessClassificationRepository: EntityRepository<BusinessClassification>,
    ){}

    async findById(businessId: string): Promise<BusinessHq> {
        const business = this.businessRepository.findOne({businessId});

        if (!business) throw new NotFoundException('Business not found');

        return business;
    }

    async initialCreation(dto: InitialBusinessCreationDto): Promise<BusinessHq> {
        const business = {
            approvedRegistration: false,
            name: dto.representativeName,
            ...dto
        }

        const createdBusiness = this.businessRepository.create(business);
        await this.businessRepository.persistAndFlush(createdBusiness);
        return createdBusiness;
    }

    async CompleteBusinessCreation(dto: CompleteBusinessCreationDTO): Promise<BusinessHq> {
        const business = await this.findById(dto.businessId);

        business.picture = dto.businessPicture;
        business.password = dto.password;

        await this.businessRepository.persistAndFlush(business);
        return business;
    }

    async delete(businessId: string) {
        const business = await this.findById(businessId);

        business.deleted = true;

        await this.businessRepository.persistAndFlush(business);
        return business;
    }

    async search(businessSearch: BusinessSearchDto): Promise<BusinessessResult> {
        const result = await this.businessRepository.findAndCount(
            {},
            {
                offset: (businessSearch.page - 1) * businessSearch.pageSize,
                limit: businessSearch.pageSize
            }
        );

        const [businessess, totalBusinessess] = result;
        const totalPages = Math.ceil(totalBusinessess / businessSearch.pageSize);

        return {
            businessess,
            totalBusinessess,
            totalPages
        }
    }
}

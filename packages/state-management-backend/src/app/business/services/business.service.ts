import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BusinessModificationDto } from '../dto/business-modification.dto';
import { BusinessSearchDto } from '../dto/business-search.dto';
import { CompleteBusinessCreationDTO } from '../dto/complete-creation.dto';
import { InitialBusinessCreationDto } from '../dto/initial-creation.dto';
import { BusinessHq } from '../entities/business.entity';
import { BusinessClassification } from '../entities/business-classification.entity';
import { BusinessessResult } from '../interfaces/businessess-result';
import { MailService } from '../../notifications/mail/mail.service';

@Injectable()
export class BusinessService {
    constructor(
        @InjectRepository(BusinessHq)
        private readonly businessRepository: EntityRepository<BusinessHq>,
        @InjectRepository(BusinessClassification)
        private readonly businessClassificationRepository: EntityRepository<BusinessClassification>,
        private readonly mailService: MailService,
    ){}

    async findById(businessId: string): Promise<BusinessHq> {
        const business = await this.businessRepository.findOne({businessId});

        if (!business || business.deleted) throw new NotFoundException('Business not found');

        return business;
    }

    async initialCreation(dto: InitialBusinessCreationDto): Promise<BusinessHq> {
        const business = {
            approvedRegistration: false,
            name: dto.representativeName,
            ...dto
        };

        const createdBusiness = this.businessRepository.create(business);
        await this.businessRepository.persistAndFlush(createdBusiness);
        return createdBusiness;
    }

    async approveBusiness(businessId: string) {
        const business = await this.findById(businessId);

        business.approvedRegistration = true;

        await this.businessRepository.flush();

        await this.mailService.sendBusinessConfirmation(business, 'www.google.com');
    }

    async CompleteBusinessCreation(dto: CompleteBusinessCreationDTO): Promise<BusinessHq> {
        const business = await this.findById(dto.businessId);

        business.picture = dto.businessPicture;
        business.password = dto.password;
        business.deleted = false;

        await this.businessRepository.persistAndFlush(business);
        return business;
    }

    async delete(businessId: string): Promise<BusinessHq> {
        const business = await this.findById(businessId);

        if (!business) throw new NotFoundException('BusinessNotFound');

        business.deleted = true;

        await this.businessRepository.persistAndFlush(business);
        return business;
    }

    async search(businessSearch: BusinessSearchDto): Promise<BusinessessResult> {

        const classificationsFound = await this.findClassifications(businessSearch.categories);

        const result = await this.businessRepository.findAndCount(
            {
                classifications: classificationsFound,
                deleted: false,
            },
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
        };
    }

    async modify(businessId: string, businessModificationDto: BusinessModificationDto): Promise<BusinessHq> {
        const business = await this.businessRepository.findOne({businessId});
        wrap(business).assign(businessModificationDto);
        await this.businessRepository.flush();

        return business;
    }

    async findClassifications(names: string[]): Promise<BusinessClassification[]> {

        const classifications = await this.businessClassificationRepository.find(
            {
                name: names
            }
        );

        return classifications;
    }
}

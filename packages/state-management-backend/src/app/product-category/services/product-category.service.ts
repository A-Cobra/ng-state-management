import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductCategory } from '../entities/product-category.entity';
import { EntityRepository } from '@mikro-orm/core';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { BusinessService } from '../../business/services/business.service';
import { PaginationResult } from '../../common/interfaces/pagination-result.interface';
import { CreateProductCategoryDto } from '../dto/create-category.dto';
import { UpdateProductCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: EntityRepository<ProductCategory>,
    private readonly businessService: BusinessService
  ) {}

  async getAll(
    paginationDto: PaginationDto,
    businessId: string
  ): Promise<PaginationResult<ProductCategory>> {
    const business = await this.businessService.findById(businessId);
    if (!business) {
      throw new NotFoundException('Business not found');
    }
    const { page, limit } = paginationDto;
    const [data, total] = await this.productCategoryRepository.findAndCount(
      { businesses: business, deleted: false },
      { offset: (page - 1) * limit, limit: limit }
    );
    const totalPages = Math.ceil(total / limit);
    return {
      data,
      totalResults: total,
      page: Number(page),
      totalPages,
    };
  }

  async search(
    paginationDto: PaginationDto,
    businessId: string,
    name: string
  ): Promise<PaginationResult<ProductCategory>> {
    const business = await this.businessService.findById(businessId);
    if (!business) {
      throw new NotFoundException('Business not found');
    }
    const { page, limit } = paginationDto;
    const [data, total] = await this.productCategoryRepository.findAndCount(
      { businesses: business, deleted: false, name: { $ilike: `%${name}%` } },
      { offset: (page - 1) * limit, limit: limit }
    );
    const totalPages = Math.ceil(total / limit);
    return {
      data,
      totalResults: total,
      page: Number(page),
      totalPages,
    };
  }

  async getById(id: string): Promise<ProductCategory> {
    const category = await this.productCategoryRepository.findOne({
      categoryId: id,
      deleted: false,
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async create(
    businessId: string,
    category: CreateProductCategoryDto
  ): Promise<ProductCategory> {
    const business = await this.businessService.findById(businessId);
    if (!business) {
      throw new NotFoundException('Business not found');
    }
    const newCategory = this.productCategoryRepository.create({
      ...category,
      businesses: business,
    });
    await this.productCategoryRepository.persistAndFlush(newCategory);
    return newCategory;
  }

  async update(
    id: string,
    category: UpdateProductCategoryDto
  ): Promise<ProductCategory> {
    const categoryToUpdate = await this.getById(id);
    if (!categoryToUpdate) {
      throw new NotFoundException('Category not found');
    }
    this.productCategoryRepository.assign(categoryToUpdate, category);
    await this.productCategoryRepository.persistAndFlush(categoryToUpdate);
    return categoryToUpdate;
  }

  async delete(id: string): Promise<void> {
    const categoryToDelete = await this.getById(id);
    if (!categoryToDelete) {
      throw new NotFoundException('Category not found');
    }
    categoryToDelete.deleted = true;
    await this.productCategoryRepository.persistAndFlush(categoryToDelete);
  }
}

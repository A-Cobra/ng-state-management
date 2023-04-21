import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductCategoryService } from '../services/product-category.service';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { ProductCategory } from '../entities/product-category.entity';
import { PaginationResult } from '../../common/interfaces/pagination-result.interface';
import { CreateProductCategoryDto } from '../dto/create-category.dto';
import { UpdateProductCategoryDto } from '../dto/update-category.dto';
import { Authorized } from '../../auth/decorator/authorized.decorator';
import { ValidRoles } from '../../auth/interfaces/valid-roles.type';

@ApiTags('ProductCategory')
@Controller({
  path: 'categories',
  version: '1',
})
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService
  ) {}

  @Get(':businessId')
  @Authorized(ValidRoles.business)
  getAll(
    @Query() paginationDto: PaginationDto,
    @Param('businessId') businessId: string
  ): Promise<PaginationResult<ProductCategory>> {
    return this.productCategoryService.getAll(paginationDto, businessId);
  }

  @Get('/search/:businessId')
  @Authorized(ValidRoles.business)
  search(
    @Query() paginationDto: PaginationDto,
    @Param('businessId') businessId: string,
    @Query('name') name: string
  ): Promise<PaginationResult<ProductCategory>> {
    return this.productCategoryService.search(paginationDto, businessId, name);
  }

  @Get('category/:categoryId')
  @Authorized(ValidRoles.business)
  getById(@Param('categoryId') categoryId: string): Promise<ProductCategory> {
    return this.productCategoryService.getById(categoryId);
  }

  @Post(':businessId')
  @HttpCode(201)
  @Authorized(ValidRoles.business)
  create(
    @Body() productCategory: CreateProductCategoryDto,
    @Param('businessId') businessId: string
  ): Promise<ProductCategory> {
    return this.productCategoryService.create(businessId, productCategory);
  }

  @Patch(':categoryId')
  @Authorized(ValidRoles.business)
  update(
    @Body() updateProductCategory: UpdateProductCategoryDto,
    @Param('categoryId') categoryId: string
  ): Promise<ProductCategory> {
    return this.productCategoryService.update(
      categoryId,
      updateProductCategory
    );
  }

  @Delete(':categoryId')
  @HttpCode(204)
  @Authorized(ValidRoles.business)
  delete(@Param('categoryId') categoryId: string): Promise<void> {
    return this.productCategoryService.delete(categoryId);
  }
}

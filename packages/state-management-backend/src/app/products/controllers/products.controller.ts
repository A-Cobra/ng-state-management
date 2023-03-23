import { CreateReviewDto } from '../dto/create-review.dto';
import { PaginatedData } from '../interfaces/pagination.interface';
import { ProductsService } from '../services/products.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Patch,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';

@Controller({
  path: 'products',
  version: '1',
})
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(
    @Query('search') productName: string,
    @Query('page') page: number,
    @Query('limit') limit: number
  ) {
    return this.productsService.findAllProducts({ page, limit, productName });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOneProduct(id);
  }

  @Post()
  createProduct(@Body() product: CreateProductDto) {
    return this.productsService.createProduct(product);
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() body: CreateProductDto) {
    return this.productsService.UpdateProduct(id, body);
  }

  @Patch(':id')
  partialUpdate(
    @Param('id') id: string,
    @Body() body: Partial<CreateProductDto>
  ) {
    return this.productsService.UpdateProduct(id, body);
  }

  @Get(':id/reviews')
  getReviews(
    @Param('id') productId: string,
    @Query('page') page: number,
    @Query('limit') limit: number
  ): Promise<PaginatedData> {
    return this.productsService.getReviews({ page, productId, limit });
  }

  @Post(':id/reviews')
  createReview(@Body() body: CreateReviewDto, @Param('id') productId: string) {
    return this.productsService.createReview({ ...body, productId });
  }
}

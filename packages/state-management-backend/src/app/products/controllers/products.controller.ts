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

@Controller({
  path: 'products',
  version: '1',
})
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts(): string {
    return 'Get All Products';
  }

  @Get(':id')
  getProduct(@Param('id') id: string): string {
    return `Get a specific Product with a specific id ${id}`;
  }

  @Post()
  createProduct(@Body() body: any): string {
    return 'Post a new product';
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() body: any): string {
    return `PUT a specific product ${id}`;
  }

  @Patch(':id')
  partialUpdateProduct(@Param('id') id: string, @Body() body: any): string {
    return `PATCH a specific product${id}`;
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

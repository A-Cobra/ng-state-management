import { CreateReviewDto } from '../dto/create-review.dto';
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
  findAll() {
    return 'Get All Products';
  }

  @Get(':id')
  findOne(@Param('productId') id: string) {
    return `Get a specific Product with a specific id ${id}`;
  }

  @Post()
  create(@Body() product: any): string {
    return 'Post a new product';
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any): string {
    return `PUT a specific product ${id}`;
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() body: any): string {
    return `PATCH a specific product${id}`;
  }

  @Get(':id/reviews')
  getReviews(
    @Param('id') productId: string,
    @Query('page') page: number,
    @Query('limit') limit: number
  ) {
    return this.productsService.getReviews({ page, productId, limit });
  }

  @Post(':id/reviews')
  createReview(@Body() body: CreateReviewDto, @Param('id') id: string) {
    return {
      message: `Update a specific Product with a specific id ${id}`,
      body,
    };
  }
}

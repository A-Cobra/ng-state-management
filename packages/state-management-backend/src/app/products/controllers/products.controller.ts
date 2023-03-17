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
  ): any {
    return {
      message: `/product/${productId}/reviews?page=${page}&limit=${limit}`,
    };
  }

  @Post(':id/reviews')
  createReview(@Body() body: any, @Param('id') id: string) {
    return {
      message: `Update a specific Product with a specific id ${id}`,
      body,
    };
  }
}

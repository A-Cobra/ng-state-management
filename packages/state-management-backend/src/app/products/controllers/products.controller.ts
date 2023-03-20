import { Body, Controller, Get, Param, Post, Put, Patch } from '@nestjs/common';

@Controller({
  path: 'products',
  version: '1',
})
export class ProductsController {
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
}

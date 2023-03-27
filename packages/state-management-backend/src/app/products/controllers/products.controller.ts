import { ProductsService } from '../services/products.service';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Patch,
  Query,
  UseGuards,
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


}

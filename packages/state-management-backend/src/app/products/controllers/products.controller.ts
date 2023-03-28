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
import { CreateProductDto } from '../dto/create-product.dto';

@Controller({
  path: 'products',
  version: '1',
})
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query('search') productName: string,
    @Query('page') page: number,
    @Query('limit') limit: number
  ) {
    return this.productsService.findAllProducts({ page, limit, productName });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOneProduct(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createProduct(@Body() product: CreateProductDto) {
    return this.productsService.createProduct(product);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() body: CreateProductDto) {
    return this.productsService.UpdateProduct(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  partialUpdate(
    @Param('id') id: string,
    @Body() body: Partial<CreateProductDto>
  ) {
    return this.productsService.UpdateProduct(id, body);
  }
}

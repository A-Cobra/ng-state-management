import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityRepository, MikroORM } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: EntityRepository<Product>
  ) {}

  findAllProducts(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async findOneProduct(idProduct: string): Promise<Product> {
    const product = await this.productRepository.findOne({ idProduct });
    if (!product) {
      throw new NotFoundException('product not found');
    }
    return product;
  }

  async createProduct(product: Product) {
    const newProduct = this.productRepository.create(product);
    await this.productRepository.persistAndFlush(newProduct);
    return newProduct;
  }

  getReviews({ page, limit, productId }) {}
}

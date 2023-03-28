import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { PaginatedData } from '../../reviews/interfaces/pagination.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: EntityRepository<Product>
  ) {}

  async findAllProducts({
    page,
    limit,
    productName,
  }): Promise<PaginatedData<Product>> {
    let products;
    if (productName) {
      products = await this.productRepository.findAndCount(
        { productName: { $ilike: `%${productName}%` } },
        {
          offset: (page - 1) * limit,
          limit,
        }
      );
    } else {
      products = await this.productRepository.findAndCount(
        {},
        {
          offset: (page - 1) * limit,
          limit,
        }
      );
    }
    const [data, total] = products;
    const totalPages = Math.ceil(total / limit);
    return {
      data,
      currentPage: page,
      totalItems: total,
      totalPages,
    };
  }

  async findOneProduct(idProduct: string): Promise<Product> {
    const product = await this.productRepository.findOne({ idProduct });
    if (!product) {
      throw new NotFoundException('product not found');
    }
    return product;
  }

  async createProduct(product: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(product);
    await this.productRepository.persistAndFlush(newProduct);
    return newProduct;
  }

  async UpdateProduct(
    idProduct: string,
    updateProductInfo: Partial<CreateProductDto> | CreateProductDto
  ): Promise<Product> {
    const product = await this.productRepository.findOne({ idProduct });
    this.productRepository.assign(product, updateProductInfo);
    await this.productRepository.flush();
    return product;
  }
}

import { Review } from '../entities/review.entity';
import { CreateReviewDto } from '../dto/create-review.dto';
import { PaginatedData } from '../interfaces/pagination.interface';
import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { EntityRepository, MikroORM } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Product } from '../entities/product.entity';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: EntityRepository<Product>,
    @InjectRepository(Review)
    private readonly reviewRespository: EntityRepository<Review>
  ) {}

  @UseGuards(JwtAuthGuard)
  async findAllProducts({ page, limit, productName }): Promise<PaginatedData> {
    // return this.productRepository.findAll();
    const products = await this.productRepository.findAndCount(
      { productName },
      {
        offset: (page - 1) * limit,
        limit,
      }
    );
    const [data, total] = products;
    const totalPages = Math.ceil(total / limit);
    return {
      data,
      currentPage: page,
      totalItems: total,
      totalPages,
    };
  }

  @UseGuards(JwtAuthGuard)
  async findOneProduct(idProduct: string): Promise<Product> {
    const product = await this.productRepository.findOne({ idProduct });
    if (!product) {
      throw new NotFoundException('product not found');
    }
    return product;
  }

  @UseGuards(JwtAuthGuard)
  async createProduct(product: Product) {
    const newProduct = this.productRepository.create(product);
    await this.productRepository.persistAndFlush(newProduct);
    return newProduct;
  }

  async getReviews({ page, limit, productId }): Promise<PaginatedData> {
    const reviews = await this.reviewRespository.findAndCount(
      { productId },
      {
        offset: (page - 1) * limit,
        limit,
      }
    );

    const [data, total] = reviews;
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      currentPage: page,
      totalItems: total,
      totalPages,
    };
  }

  async createReview(body: CreateReviewDto): Promise<Review> {
    const review = this.reviewRespository.create(body);
    this.reviewRespository.persistAndFlush(review);
    return review;
  }
}

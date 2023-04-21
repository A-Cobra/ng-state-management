import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { CreateCourierReviewDto } from '../dto/create-courier-review.dto';
import { CreateReviewDto } from '../dto/create-product-review.dto';
import { Review } from '../entities/review.entity';
import { PaginatedData } from '../interfaces/pagination.interface';
import { CourierReviewsService } from '../services/courier-review.service';
import { ProductReviewsService } from '../services/product-reviews.service';

@Controller({
  path: 'reviews',
  version: '1',
})
export class ReviewsController {
  constructor(
    private readonly productsReviewsSergice: ProductReviewsService,
    private readonly courierReviewsService: CourierReviewsService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('products/:id')
  getReviews(
    @Param('id') productId: string,
    @Query() paginationDto: PaginationDto
  ): Promise<PaginatedData<Review>> {
    const { page, limit } = paginationDto;
    return this.productsReviewsSergice.getProductsReviews(
      page,
      limit,
      productId
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('products/:id')
  createReview(
    @Body() body: CreateReviewDto,
    @Param('id') productId: string
  ): Promise<Review> {
    return this.productsReviewsSergice.createProductReview({
      ...body,
      productId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('courier/:id')
  getCourierReviews(
    @Param('id') courierId: string,
    @Query() paginationDto: PaginationDto
  ): Promise<PaginatedData<Review>> {
    const { page, limit } = paginationDto;
    return this.courierReviewsService.getCourierReviews(page, limit, courierId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('courier/:id')
  createCourierReview(
    @Body() body: CreateCourierReviewDto,
    @Param('id') courierId: string
  ): Promise<Review> {
    return this.courierReviewsService.createCourierReview({
      ...body,
      courierId,
    });
  }
}

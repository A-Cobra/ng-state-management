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
import { CreateCourierReviewDto } from '../dto/create-courier-review';
import { CreateReviewDto } from '../dto/create-review.dto';
import { Review } from '../entities/review.entity';
import { PaginatedData } from '../interfaces/pagination.interface';
import { ReviewsService } from '../services/reviews.service';

@Controller({
  path: 'reviews',
  version: '1',
})
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('products/:id')
  getReviews(
    @Param('id') productId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 15
  ): Promise<PaginatedData<Review>> {
    return this.reviewsService.getProductsReviews(page, limit, productId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('products/:id')
  createReview(
    @Body() body: CreateReviewDto,
    @Param('id') productId: string
  ): Promise<Review> {
    return this.reviewsService.createProductReview({ ...body, productId });
  }

  @UseGuards(JwtAuthGuard)
  @Get('courier/:id')
  getCourierReviews(
    @Param('id') courierId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 15
  ): Promise<PaginatedData<Review>> {
    return this.reviewsService.getCourierReviews(page, limit, courierId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('courier/:id')
  createCourierReview(
    @Body() body: CreateCourierReviewDto,
    @Param('id') courierId: string
  ): Promise<Review> {
    return this.reviewsService.createCourierReview({ ...body, courierId });
  }
}

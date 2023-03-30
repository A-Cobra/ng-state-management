import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ReviewsService } from '../services/reviews.service';
import { CreateReviewDto } from '../dto/create-review.dto';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { PaginatedData } from '../interfaces/pagination.interface';
import { Review } from '../entities/review.entity';
import { ProductReview } from '../entities/product-review.entity';

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
}

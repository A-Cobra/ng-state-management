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

@Controller({
  path: 'reviews',
  version: '1',
})
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // @UseGuards(JwtAuthGuard)
  @Get('products/:id')
  getReviews(
    @Param('id') productId: string,
    @Query('page') page: number,
    @Query('limit') limit: number
  ): Promise<PaginatedData<Review>> {
    return this.reviewsService.getReviews({ page, productId, limit });
  }

  // @UseGuards(JwtAuthGuard)
  @Post('products/:id')
  createReview(
    @Body() body: CreateReviewDto,
    @Param('id') productId: string
  ): Promise<Review> {
    return this.reviewsService.createReview({ ...body, productId });
  }
}

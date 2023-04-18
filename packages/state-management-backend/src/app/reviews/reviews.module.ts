import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CouriersService } from '../couriers/services/couriers.service';
import { ReviewsController } from './controllers/reviews.controller';
import { CourierReview } from './entities/courier-review.entity';
import { ProductReview } from './entities/product-review.entity';
import { Review } from './entities/review.entity';
import { CourierReviewsService } from './services/courier-review.service';
import { ProductReviewsService } from './services/product-reviews.service';
import { Courier } from '../couriers/entities/courier.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([Review, ProductReview, CourierReview, Courier]),
  ],
  controllers: [ReviewsController],
  providers: [ProductReviewsService, CourierReviewsService, CouriersService],
})
export class ReviewsModule {}

import { Module } from '@nestjs/common';
import { ReviewsService } from './services/reviews.service';
import { ReviewsController } from './controllers/reviews.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Review } from './entities/review.entity';
import { ProductReview } from './entities/product-review.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Review, ProductReview])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}

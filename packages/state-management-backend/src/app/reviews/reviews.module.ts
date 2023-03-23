import { Module } from '@nestjs/common';
import { ReviewsService } from './services/reviews.service';
import { ReviewsController } from './controllers/reviews.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Review } from './entities/review.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Review])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}

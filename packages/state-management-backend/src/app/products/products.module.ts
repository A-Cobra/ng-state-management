import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ReviewsModule } from './reviews/reviews.module';

@Module({ imports: [ReviewsModule], controllers: [ProductsController] })
export class ProductsModule {}

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Review } from '../reviews/entities/review.entity';
import { ProductsController } from './controllers/products.controller';
import { Product } from './entities/product.entity';
import { ProductsService } from './services/products.service';
import { ProductCategory } from './entities/product-category.entity';
import { BusinessHq } from '../business/entities/business.entity';
import { BusinessModule } from '../business/business.module';
import { ProductCategoryController } from './controllers/product-category.controller';
import { ProductCategoryService } from './services/product-category.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([Product, Review, ProductCategory, BusinessHq]),
    BusinessModule,
  ],
  controllers: [ProductsController, ProductCategoryController],
  providers: [ProductsService, ProductCategoryService],
  exports: [ProductsService],
})
export class ProductsModule {}

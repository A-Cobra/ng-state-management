import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ProductCategory } from './entities/product-category.entity';
import { ProductCategoryController } from './controllers/product-category.controller';
import { ProductCategoryService } from './services/product-category.service';
import { BusinessHq } from '../business/entities/business.entity';

@Module({
  imports: [MikroOrmModule.forFeature([ProductCategory, BusinessHq])],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService],
})
export class ProductCategoryModule {}

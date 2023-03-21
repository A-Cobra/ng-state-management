import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { DBModule } from '../database/database.module';
import { ProductsController } from './controllers/products.controller';
import { Product } from './entities/product.entity';
import { ProductsService } from './services/products.service';
import { Review } from './entities/review.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([Product]),
    MikroOrmModule.forFeature([Review]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}

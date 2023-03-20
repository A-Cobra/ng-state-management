import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Review } from './entities/review.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Review])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}

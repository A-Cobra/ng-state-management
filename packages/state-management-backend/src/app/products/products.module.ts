import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ReviewEntity } from './entities/review.entity';

@Module({
  imports: [MikroOrmModule.forFeature([ReviewEntity])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}

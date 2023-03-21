import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { DBModule } from '../database/database.module';
import { ProductsController } from './controllers/products.controller';
import { Product } from './entities/product.entity';
import { ProductsService } from './services/products.service';

@Module({
  imports: [DBModule, MikroOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}

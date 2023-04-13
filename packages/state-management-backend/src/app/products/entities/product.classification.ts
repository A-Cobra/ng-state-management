import { Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { Product } from './product.entity';

@Entity()
export class ProductClassification {
  @PrimaryKey()
  idBusinessxBusinessClassification: string = v4();

  @ManyToOne(() => Product)
  product: Product;
}

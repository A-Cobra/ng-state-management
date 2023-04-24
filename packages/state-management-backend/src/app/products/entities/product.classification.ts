import { Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { Product } from './product.entity';
import { v4 } from 'uuid';
@Entity()
export class ProductClassification {
  @PrimaryKey()
  idBusinessxBusinessClassification: string = v4();

  @ManyToOne(() => Product)
  product: Product;
}

import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { BusinessHq } from '../../business/entities/business.entity';

@Entity()
export class ProductCategory {
  @PrimaryKey()
  categoryId: string = v4();

  @Property()
  name: string;

  @Property({ nullable: true })
  description?: string;

  @ManyToOne(() => BusinessHq, { hidden: true })
  businesses!: BusinessHq;
}

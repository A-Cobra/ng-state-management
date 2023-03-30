import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Customer {
  @PrimaryKey()
  customer_id: string = v4();

  @OneToOne()
  user: User;

  @Property({ default: false })
  isDeleted: boolean;

  //Todo Add address relation
}

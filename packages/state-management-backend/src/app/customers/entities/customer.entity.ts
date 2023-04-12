import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Customer extends User {
  @Property({ default: false, hidden: true })
  isDeleted: boolean;
  //Todo Add address relation
}

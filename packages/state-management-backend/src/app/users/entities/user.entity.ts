import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class User {
  @PrimaryKey()
  userId: string = v4();

  @Property()
  role: string;

  @Property()
  username: string;

  @Property()
  name: string;

  @Property({ nullable: true })
  lastname?: string;

  @Property()
  picture: string;

  @Property()
  email: string;

  @Property()
  contactNumber: string;

  @Property({ default: false })
  deleted?: boolean;
}

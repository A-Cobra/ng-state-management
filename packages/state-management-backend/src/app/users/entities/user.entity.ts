import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class User {
  @PrimaryKey()
  userId: string = v4();

  // Todo review when roles are ready
  @Property({ default: 'customer' })
  role: string;

  @Property()
  username: string;

  @Property()
  name: string;

  @Property({ nullable: true })
  lastname?: string;

  @Property({ nullable: true })
  picture?: string;

  @Property()
  email: string;

  @Property({ hidden: true })
  password: string;

  @Property({ default: false })
  isLoggedIn: boolean;

  @Property()
  contactNumber: string;

  @Property({ nullable: true })
  refreshToken?: string;
}

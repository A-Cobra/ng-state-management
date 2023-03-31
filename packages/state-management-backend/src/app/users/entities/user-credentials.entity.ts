import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class UserCredentials {
  @PrimaryKey()
  user: string;

  @Property({ unique: true })
  email: string;

  @Property()
  password: string;

  @Property()
  role: string;

  @Property({ default: false })
  isLoggedIn?: boolean;

  @Property({ nullable: true })
  refreshToken?: string;
}

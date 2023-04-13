import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Role } from '../../roles/entities/role.entity';

@Entity()
export class User {
  @PrimaryKey()
  userId: string = v4();

  @Property()
  role: Role;

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
  password: string;

  @Property({ default: false })
  isLoggedIn: boolean;

  @Property()
  contactNumber: string;

  @Property({ nullable: true })
  refreshToken?: string;
}

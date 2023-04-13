import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Role } from '../../roles/entities/role.entity';

export abstract class User {
  @PrimaryKey()
  userId: string = v4();

  @Property({ type: 'string', length: 50 })
  name: string;

  @Property({ nullable: true, type: 'string', length: 100 })
  picture?: string;

  @Property({ nullable: true, type: 'string', length: 100 })
  lastname?: string;

  @Property({ type: 'string', length: 60 })
  email: string;

  @Property({ type: 'string', length: 20 })
  username: string;

  @Property({ type: 'string', length: 50 })
  password: string;

  @Property({ type: 'string', length: 15 })
  contactNumber: string;

  @Property()
  role: Role;

  @Property({ default: false })
  isLoggedIn: boolean;

  @Property({ nullable: true })
  refreshToken?: string;

  @Property({ default: false })
  deleted?: boolean;
}

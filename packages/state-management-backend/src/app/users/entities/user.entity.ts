import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { ValidRoles } from '../../auth/interfaces/valid-roles.type';
import { Role } from './role.entity';
import { UserCredentials } from './user-credentials.entity';

export abstract class User {
  @PrimaryKey()
  userId: string = v4();

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

  @Property()
  contactNumber: string;

  @Property({ default: false })
  deleted?: boolean;
}

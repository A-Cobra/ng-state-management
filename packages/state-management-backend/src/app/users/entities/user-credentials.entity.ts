import {
  Entity,
  OneToOne,
  PrimaryKey,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core';
import { User } from './user.entity';
import { Role } from './role.entity';
import { v4 } from 'uuid';
import { BusinessHq } from '../../business/entities/business.entity';
import { Customer } from '../../customers/entities/customer.entity';

@Entity()
export class UserCredentials {
  @PrimaryKey()
  id: string = v4();

  @Property({ unique: true })
  userId: string;

  @Property({ unique: true })
  email: string;

  @Property()
  password: string;

  @Property()
  role: Role;

  @Property({ default: false })
  isLoggedIn?: boolean;

  @Property({ nullable: true })
  refreshToken?: string;
}

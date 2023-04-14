import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Role } from './role.entity';

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

  @ManyToOne()
  role: Role;

  @Property({ default: false })
  isLoggedIn?: boolean;

  @Property({ nullable: true })
  refreshToken?: string;
}

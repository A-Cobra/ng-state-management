import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Role } from './role.entity';
import { v4 } from 'uuid';

@Entity()
export class UserCredentials {
  @PrimaryKey()
  id: string = v4();

  @Property({ unique: true })
  userId: string;

  @Property({ unique: true })
  email: string;

  @Property({ hidden: true })
  password: string;

  @ManyToOne(() => Role)
  role: Role;

  @Property({ default: false })
  isLoggedIn?: boolean;

  @Property({ nullable: true })
  refreshToken?: string;
}

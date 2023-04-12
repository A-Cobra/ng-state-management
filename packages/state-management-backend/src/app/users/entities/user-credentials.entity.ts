import { Entity, OneToOne, PrimaryKeyType, Property } from '@mikro-orm/core';
import { User } from './user.entity';
import { Role } from './role.entity';

@Entity()
export class UserCredentials {
  @OneToOne({ primary: true })
  user!: User;

  [PrimaryKeyType]?: number; // this is needed for proper type checks in `FilterQuery`

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

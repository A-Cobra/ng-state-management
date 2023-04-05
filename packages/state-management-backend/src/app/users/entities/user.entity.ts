import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { ValidRoles } from '../../auth/interfaces/valid-roles.type';

@Entity()
export class User {
  @PrimaryKey()
  userId: string = v4();

  // Todo review when roles are ready
  @Property({ default: ValidRoles.customer })
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

  @Property()
  contactNumber: string;

  @Property({ default: false })
  deleted?: boolean;
}

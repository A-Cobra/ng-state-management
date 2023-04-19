import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class Role {
  @PrimaryKey()
  roleId: string = v4();

  @Property({ type: 'string', length: 20 })
  roleName: string;
}

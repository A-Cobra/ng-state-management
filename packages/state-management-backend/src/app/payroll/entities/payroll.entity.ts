import {
  Collection,
  Entity,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { AccountType } from '../../account/entities/account-type.entity';

@Entity()
export class Payroll {
  @PrimaryKey()
  idPayroll: string = v4();

  @Property()
  accountNumber: string;

  @Property()
  bankName: string;

  @Property()
  fullName: string;

  @Property()
  documentNumber: string;

  @OneToOne(() => AccountType, (accountType) => accountType.idAccount)
  account = new Collection<AccountType>(this);
}

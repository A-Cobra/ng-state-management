import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { AccountType } from '../../account/entities/account-type.entity';
import { BusinessHq } from '../../business/entities/business.entity';

@Entity()
export class Payroll {
  @PrimaryKey()
  idPayroll: string = v4();

  @Property({ type: 'string', length: 20 })
  accountNumber: string;

  @Property({ type: 'string', length: 50 })
  bankName: string;

  @Property({ type: 'string', length: 50 })
  fullName: string;

  @Property({ type: 'string', length: 50 })
  documentNumber: string;

  @OneToOne(() => AccountType, (accountType) => accountType.idAccount)
  account: AccountType;
}

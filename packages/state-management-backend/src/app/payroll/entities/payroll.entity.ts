import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

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

  @OneToOne()
  accountTypeIdAccount: string;
}

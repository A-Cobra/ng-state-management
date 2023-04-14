import { BankAccountType } from '../models/bank-account-type.model';

export const BANK_ACCOUNT_TYPES: BankAccountType[] = [
  {
    key: '1',
    name: 'Checking account',
    description: 'unlimited access to the money without earning interest',
  },
  {
    key: '2',
    name: 'Savings account',
    description: 'No constant access to the money but with nominal interest',
  },
  {
    key: '3',
    name: 'Money market account',
    description:
      'Blend between a checking and savings account, with access to the money once per month',
  },
  {
    key: '4',
    name: 'Certificate of deposit (CD)',
    description: 'A secure way to invest the money for a set period of time',
  },
  {
    key: '5',
    name: 'Individual retirement arrangement (IRA)',
    description:
      'A tax-deductible or tax-deferred way to invest the money for retirement',
  },
  {
    key: '6',
    name: 'Brokerage account',
    description:
      'Invest the money without penalization for taking it out before the age of 59½',
  },
];

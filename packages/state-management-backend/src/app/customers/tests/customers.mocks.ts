import { User } from '../../users/entities/user.entity';

export const mockCustomers = [
  {
    customer_id: 'customer1',
    user: {} as Partial<User>,
    isDeleted: false,
  },
  {
    customer_id: 'customer2',
    user: {} as Partial<User>,
    isDeleted: false,
  },
];

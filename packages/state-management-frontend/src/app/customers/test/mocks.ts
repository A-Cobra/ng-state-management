import { Customer } from '../models/customer.model';

export const MOCK_CUSTOMER: Customer = {
  name: 'John',
  lastName: 'Doe',
  username: 'johndoe1',
  image: 'https://dummyimage.com/400x400/000000/fff',
};

export const MOCK_CUSTOMERS: Customer[] = [
  {
    name: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    image: 'https://dummyimage.com/400x400/000000/fff',
  },
  {
    name: 'Mark',
    lastName: 'Jobs',
    username: 'markjobs',
    image: 'https://dummyimage.com/400x400/000000/fff',
  },
];

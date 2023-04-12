import { of } from 'rxjs';

import { Customer } from '../models/customer.model';

export const MOCK_CUSTOMER: Customer = {
  id: '1',
  name: 'John',
  lastName: 'Doe',
  username: 'johndoe1',
  image: 'https://dummyimage.com/400x400/000000/fff',
  email: 'johndoe@example.com',
  phoneNumber: '1234567890',
  paymentMethod: 'Visa',
};

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: '1',
    name: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    image: 'https://dummyimage.com/400x400/000000/fff',
    email: 'johndoe@example.com',
    phoneNumber: '1234567890',
    paymentMethod: 'Visa',
  },
  {
    id: '2',
    name: 'Mark',
    lastName: 'Jobs',
    username: 'markjobs',
    image: 'https://dummyimage.com/400x400/000000/fff',
    email: 'markjobs@example.com',
    phoneNumber: '0987654321',
    paymentMethod: 'Visa',
  },
];

export const activatedRouteMock = {
  params: of({ userId: '123' }),
};

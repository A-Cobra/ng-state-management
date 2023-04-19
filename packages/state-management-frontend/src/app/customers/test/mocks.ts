import { CustomerInterface } from '@state-management-app/types';
import { of } from 'rxjs';

export const MOCK_CUSTOMER: CustomerInterface = {
  customerId: '1',
  name: 'John',
  lastname: 'Doe',
  email: 'johndoe@email.com',
  username: 'johndoe',
  address: {
    addressId: '1',
    address: '123 Main St',
    latitude: '123',
    longitude: '123',
    notes: 'This is a note',
    tagName: '',
  },
  contactNumber: '1234567890',
  isLoggedIn: false,
  password: '123456',
  role: {
    roleId: '1',
    roleName: 'Customer',
  },
  userId: '1',
  deleted: false,
  picture: '',
  refreshToken: '',
};

export const MOCK_CUSTOMERS: CustomerInterface[] = [
  {
    customerId: '1',
    name: 'John',
    lastname: 'Doe',
    email: 'johndoe@email.com',
    username: 'johndoe',
    address: {
      addressId: '1',
      address: '123 Main St',
      latitude: '123',
      longitude: '123',
      notes: 'This is a note',
      tagName: '',
    },
    contactNumber: '1234567890',
    isLoggedIn: false,
    password: '123456',
    role: {
      roleId: '1',
      roleName: 'Customer',
    },
    userId: '1',
    deleted: false,
    picture: '',
    refreshToken: '',
  },
  {
    customerId: '2',
    name: 'Jane',
    lastname: 'Smith',
    email: 'janesmith@email.com',
    username: 'janesmith',
    address: {
      addressId: '2',
      address: '456 Oak St',
      latitude: '456',
      longitude: '456',
      notes: 'This is another note',
      tagName: '',
    },
    contactNumber: '9876543210',
    isLoggedIn: false,
    password: '654321',
    role: {
      roleId: '1',
      roleName: 'Customer',
    },
    userId: '2',
    deleted: false,
    picture: '',
    refreshToken: '',
  },
];

export const activatedRouteMock = {
  params: of({ customerId: '1' }),
};

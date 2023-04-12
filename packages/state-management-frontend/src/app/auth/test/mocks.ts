import { User, UserLogin } from '../interfaces/user.model';

export const MOCK_USER: User = {
  name: 'John',
  lastName: 'Doe',
  username: 'johndoe',
  email: 'johndoe@example.com',
  contactNumber: '1234567890',
  password: 'password',
};

export const MOCK_USER_LOGIN: UserLogin = {
  email: 'johndoe@example.com',
  password: 'password',
};

import { User } from '../entities/user.entity';

export const userDto: User = {
  userId: '1',
  role: 'customer',
  username: 'c',
  name: 'c',
  lastname: 'c',
  picture: 'link',
  email: 'user@mail.com',
  contactNumber: '3239239',
  deleted: false,
};

export const credentialsStub = {
  user: userDto,
  email: 'user@mail.com',
  role: 'ADMIN',
  password: '123',
  isLoggedIn: true,
  refreshToken: '123456',
};

export const createCredentialsDtoStub = {
  user: userDto,
  email: 'user@mail.com',
  role: 'ADMIN',
  password: '123',
};

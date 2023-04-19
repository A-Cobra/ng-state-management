import { Role } from '../entities/role.entity';
import { UserCredentials } from '../entities/user-credentials.entity';
import { User } from '../entities/user.entity';

export const userDto: User = {
  userId: '1',
  username: 'c',
  name: 'c',
  lastname: 'c',
  picture: 'link',
  email: 'user@mail.com',
  contactNumber: '3239239',
  deleted: false,
  password: '',
  role: new Role(),
  isLoggedIn: false,
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
  userId: '1',
  email: 'user@mail.com',
  role: 'ADMIN',
  password: '123',
};

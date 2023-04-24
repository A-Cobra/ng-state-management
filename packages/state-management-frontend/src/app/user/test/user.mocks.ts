import { UserInterface } from '@state-management-app/types';

export const userMock: UserInterface = {
  userId: '1',
  email: 'user1@example.com',
  lastname: 'Doe',
  name: 'John',
  contactNumber: '5551234',
  isLoggedIn: true,
  role: {
    roleId: '1',
    roleName: 'Admin',
  },
  username: 'johndoe',
  password: '123456',
  deleted: false,
  picture: '',
  refreshToken: '',
};

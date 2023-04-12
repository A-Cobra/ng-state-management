import { of } from 'rxjs';

import { UserProfile } from '../models/user.model';

export const mockUser: UserProfile = {
  id: '123',
  name: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phoneNumber: '5555555555',
};

export const userServiceMock = {
  getUserProfile: jest.fn().mockReturnValue(of(mockUser)),
  saveUserProfile: jest.fn().mockReturnValue(of(mockUser)),
};

export const modalServiceMock = {
  open: jest.fn(() => ({
    afterClosed: of(true),
  })),
};

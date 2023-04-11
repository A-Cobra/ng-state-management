import { of } from 'rxjs';
import { UserProfile } from '../models/user.model';

export const activatedRouteMock = {
  params: of({ userId: '123' }),
};

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

export const saveChangesModalMock = {
  data: {
    title: 'Are you sure to save the changes?',
    message: 'The changes made can be changed later',
    confirmButtonLabel: 'Save',
    cancelButtonLabel: 'Cancel',
  },
  width: 'fit-content',
  height: 'fit-content',
};

export const backModalMock = {
  data: {
    title: 'Are you sure leave?',
    message: 'Changes will not be saved',
    confirmButtonLabel: 'Leave',
    cancelButtonLabel: 'Cancel',
  },
  width: 'fit-content',
  height: 'fit-content',
};

export const cancelModalMock = {
  data: {
    title: 'Are you sure to cancel?',
    message: 'Changes will not be saved',
    confirmButtonLabel: 'Cancel',
    cancelButtonLabel: 'Edit',
  },
  width: 'fit-content',
  height: 'fit-content',
};

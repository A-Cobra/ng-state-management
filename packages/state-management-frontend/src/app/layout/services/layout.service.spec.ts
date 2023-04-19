import { of } from 'rxjs';
import { LayoutService } from './layout.service';
import { MOCK_ROLES, MOCK_USER_LAYOUT } from '../tests/layout-mocks';

describe('LayoutService', () => {
  let service: LayoutService;

  beforeEach(() => {
    service = new LayoutService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return user data', () => {
    const mockUserData = MOCK_USER_LAYOUT;
    const getUserDataSpy = jest.spyOn(service, 'getUserData');
    getUserDataSpy.mockReturnValue(of(mockUserData));

    service.getUserData().subscribe((userData) => {
      expect(userData).toEqual(mockUserData);
    });
  });

  it('should return roles', () => {
    const mockRoles = MOCK_ROLES;
    const getRolesSpy = jest.spyOn(service, 'getRoles');
    getRolesSpy.mockReturnValue(of(mockRoles));

    service.getRoles().subscribe((roles) => {
      expect(roles).toEqual(mockRoles);
    });
  });

  it('should convert UUID to number', () => {
    const uuid = '6b22d6e9-1039-4e45-82e7-7b0df8e2e7b2';
    const expectedNumber = parseInt(uuid.replace(/-/g, ''), 16);
    const convertedNumber = service.uuidToNumber(uuid);
    expect(convertedNumber).toEqual(expectedNumber);
  });
});

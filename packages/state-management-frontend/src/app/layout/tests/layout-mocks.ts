import { UserLayout } from '../models/layout.model';
import { RoleLayout } from '../models/layout.model';

export const MOCK_USER_LAYOUT: UserLayout = {
  id: 'a25a3836-9d8e-4a09-a5f5-85f7c741a5a4',
  name: 'John',
  lastName: 'Robot',
  username: 'johndoe',
  email: 'johndoe@example.com',
  contactNumber: '1234567890',
  password: 'password',
  roleId: 'e30a3836-9d8e-4a09-a5f5-85f7c741a5a4',
  picture:
    'https://images.freejpg.com.ar/900/1704/robot-technology-modern-white-humanoid-F100021943.jpg',
};

export const MOCK_ROLES: RoleLayout[] = [
  { roleName: 'admin', roleId: 'e30a3836-9d8e-4a09-a5f5-85f7c741a5a4' },
  { roleName: 'customer', roleId: 'a19683b4-c4ac-4dcb-82f5-33a847a7d128' },
  { roleName: 'courier', roleId: '82d6171f-64c3-4f9d-82c5-e76fb5f7cbbd' },
  { roleName: 'business', roleId: '4f13c4e4-521e-4cb9-9e89-44db674144a7' },
];

import { Role } from '../roles';

export interface UserInterface {
  userId: string;
  name: string;
  picture?: string;
  lastname?: string;
  email: string;
  username: string;
  password: string;
  contactNumber: string;
  role: Role;
  isLoggedIn: boolean;
  refreshToken?: string;
  deleted?: boolean;
}

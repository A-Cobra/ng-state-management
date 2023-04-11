export interface Role {
  roleId: string;
  roleName: string;
}
export interface User {
  name: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  contactNumber: string;
  roleId: string;
  picture?: string;
}

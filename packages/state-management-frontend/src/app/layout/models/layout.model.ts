export interface RoleLayout {
  roleId: string;
  roleName: string;
}
export interface UserLayout {
  id: string;
  name: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  contactNumber: string;
  roleId: string;
  picture?: string;
}

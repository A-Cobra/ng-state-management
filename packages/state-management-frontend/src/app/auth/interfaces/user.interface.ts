export interface User {
  name: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  contactNumber: string;
  rol?: number;
  picture?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

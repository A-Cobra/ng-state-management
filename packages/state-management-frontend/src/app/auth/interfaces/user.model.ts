export interface User {
  name: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  contactNumber: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

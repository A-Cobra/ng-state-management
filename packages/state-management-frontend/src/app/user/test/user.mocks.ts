import { Component } from '@angular/core';
import { Routes } from '@angular/router';
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

@Component({
  selector: 'app-home-component',
  template: '<span> Mock Component </span>',
})
export class MockCustomerComponent {}
export const routes: Routes = [
  {
    path: '',
    component: MockCustomerComponent,
  },
];

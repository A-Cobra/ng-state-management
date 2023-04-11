import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { RoleLayout, UserLayout } from '../models/layout.interface';
import { MOCK_ROLES, MOCK_USER_LAYOUT } from '../tests/layout-mocks';

@Injectable()
export class LayoutService {
  roles = MOCK_ROLES;
  userData = MOCK_USER_LAYOUT;

  getUserData(): Observable<UserLayout> {
    //TODO: call GET from Backend
    return of(this.userData);
  }
  getRoles(): Observable<RoleLayout[]> {
    //TODO: call GET from Backend
    return of(this.roles);
  }
  uuidToNumber(uuid: string): number {
    const hex = uuid.replace(/-/g, '');
    return parseInt(hex, 16);
  }
}

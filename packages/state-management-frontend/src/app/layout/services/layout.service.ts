import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

import { Role } from '../models/layout.interface';
import { MOCK_ROLES } from '../tests/layout-mocks';

@Injectable()
export class LayoutService {
  roles = MOCK_ROLES;

  getRoles(): Observable<Role[]> {
    //TODO: call GET from Backend

    return of(this.roles);
  }

  uuidToNumber(uuid: string): number {
    const hex = uuid.replace(/-/g, '');
    return parseInt(hex, 16);
  }
}

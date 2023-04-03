import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Classification } from '../models/classification.interface';
import { MOCK_CLASSIFICATIONS } from '../test/mocks';
import { Business } from '../models/business.interface';

@Injectable()
export class BusinessService {
  classifications: Classification[] = MOCK_CLASSIFICATIONS;

  addNewBusiness(data: Business): Observable<boolean> {
    //TODO: call POST to Backend
    return of(true);
  }

  getClassifications(): Observable<Classification[]> {
    //TODO: call GET from Backend
    return of(this.classifications);
  }
}

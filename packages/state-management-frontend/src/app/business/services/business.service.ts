import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Classification } from '../models/classification.interface';
import { CLASSIFICATIONS } from '../data/classifications';
import { Business } from '../models/business.interface';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  classifications: Classification[] = CLASSIFICATIONS;

  addNewBusiness(data: Business): Observable<boolean> {
    //POST to BE
    console.log(data);
    return of(true);
  }

  getClassifications(): Observable<Classification[]> {
    return of(this.classifications as Classification[]);
  }
}

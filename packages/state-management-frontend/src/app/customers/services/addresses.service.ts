import { Injectable } from '@angular/core';
import { Address } from '@state-management-app/types';
import { Observable, of } from 'rxjs';
import { MOCK_CUSTOMER } from '../test/customers.mocks';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ADDRESSES_CONTROLLER_VERSION } from './addresses-controller-version';

@Injectable()
export class AddressesService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.apiBaseUrl}${ADDRESSES_CONTROLLER_VERSION}`;
  }

  getAddressesByUserId(userId: string): Observable<Address[]> {
    return of(MOCK_CUSTOMER.addresses);
    return this.http.get<Address[]>(`${this.baseUrl}/addresses/${userId}`);
  }
}

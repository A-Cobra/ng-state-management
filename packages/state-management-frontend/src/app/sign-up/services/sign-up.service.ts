import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { UserI } from '../interfaces/user.interface';

@Injectable()
export class SignUpService {
  signUp(user: UserI): Observable<boolean> {
    return of(false).pipe(delay(1500));
  }
}

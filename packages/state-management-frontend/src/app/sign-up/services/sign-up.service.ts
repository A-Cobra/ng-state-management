import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable()
export class SignUpService {
  signUp(user: User): Observable<boolean> {
    return of(false).pipe(delay(1500));
  }
}

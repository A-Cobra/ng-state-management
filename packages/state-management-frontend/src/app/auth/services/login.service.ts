import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../interfaces/user.interface';

@Injectable()
export class LoginService {
  login(user: UserLogin): Observable<boolean> {
    return new Observable((observer) => {
      setTimeout(() => {
        const success = false;
        if (success) {
          observer.next(true);
          observer.complete();
        } else {
          observer.error(new Error('Unable to login user'));
        }
      }, 1500);
    });
  }
}

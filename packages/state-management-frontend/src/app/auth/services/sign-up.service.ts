import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.model';

@Injectable()
export class SignUpService {
  signUp(user: User): Observable<boolean> {
    return new Observable((observer) => {
      setTimeout(() => {
        const success = false;
        if (success) {
          observer.next(true);
          observer.complete();
        } else {
          observer.error(new Error('Unable to sign up user'));
        }
      }, 1500);
    });
  }
}

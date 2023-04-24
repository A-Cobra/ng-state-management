import { Injectable } from '@angular/core';
import { UserInterface } from '@state-management-app/types';
import { delay, Observable, of } from 'rxjs';
import { userMock } from '../test/user.mocks';

@Injectable()
export class UserService {
  #usersProfileData: UserInterface = userMock;

  getUserProfile(): Observable<UserInterface | undefined> {
    // TODO: Replace with real implementation when BE be ready.

    return of(this.#usersProfileData).pipe(delay(2000));
  }

  saveUserProfile(userProfile: UserInterface): Observable<UserInterface> {
    // TODO: Replace with real implementation when BE be ready.
    return of(userProfile);
  }
}

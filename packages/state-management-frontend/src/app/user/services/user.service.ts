import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { UserProfile } from '../models/user.model';
import { mockUser } from '../test/mocks';

@Injectable()
export class UserService {
  #usersProfileData: UserProfile = mockUser;

  getUserProfile(): Observable<UserProfile | undefined> {
    // TODO: Replace with real implementation when BE be ready.

    return of(this.#usersProfileData).pipe(delay(2000));
  }

  saveUserProfile(userProfile: UserProfile): Observable<UserProfile> {
    // TODO: Replace with real implementation when BE be ready.
    return of(userProfile);
  }
}

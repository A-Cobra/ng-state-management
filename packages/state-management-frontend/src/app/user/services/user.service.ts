import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { UserProfile } from '../models/user.model';
import { mockUser } from '../test/mocks';

@Injectable()
export class UserService {
  #usersProfileData: UserProfile = mockUser;

  getUserProfile(): Observable<UserProfile | undefined> {
    // TODO: Replace with real implementation when BE will be ready.
    return of(this.#usersProfileData);
  }

  saveUserProfile(userProfile: UserProfile): Observable<UserProfile> {
    // TODO: Replace with real implementation when BE will be ready.
    return of(userProfile);
  }
}

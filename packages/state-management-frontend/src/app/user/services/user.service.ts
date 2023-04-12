import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { USER_PROFILE_DATA } from '../data/user.data';
import { UserProfile } from './../models/user.model';

@Injectable()
export class UserService {
  #usersProfileData: UserProfile = USER_PROFILE_DATA;

  getUserProfile(): Observable<UserProfile | undefined> {
    // TODO: Replace with real implementation when BE will be ready.
    return of(this.#usersProfileData);
  }

  saveUserProfile(userProfile: UserProfile): Observable<UserProfile> {
    // TODO: Replace with real implementation when BE will be ready.
    return of(userProfile);
  }
}

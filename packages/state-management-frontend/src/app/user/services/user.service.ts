import { Observable, of } from 'rxjs';
import { UserProfile } from './../models/user.model';
import { Injectable } from '@angular/core';
import { USERS_PROFILE_DATA } from '../data/user.data';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  #usersProfileData: UserProfile[] = USERS_PROFILE_DATA;

  getUserProfile(userId: string): Observable<UserProfile | undefined> {
    // TODO: Replace with real implementation when BE will be ready.
    return of(this.#usersProfileData.find((user) => user.id === userId));
  }

  saveUserProfile(userProfile: UserProfile): Observable<UserProfile> {
    // TODO: Replace with real implementation when BE will be ready.
    return of(userProfile);
  }
}

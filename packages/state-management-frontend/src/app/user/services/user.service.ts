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
    return of(this.#usersProfileData.find((user) => user.id === userId));
  }
}

import { Injectable } from '@angular/core';
import { UserStateModel, UserState } from './state.users';
import { Selector } from '@ngxs/store';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })

// this is the user selector service
export class UserSelectors {
  constructor() {}

  // get user token
  @Selector([UserState])
  static getUserToken(state: UserStateModel) {
    return state.token;
  }

  //  Selector to get the users state
  @Selector([UserState])
  static getUsers(state: UserStateModel) {
    return state.users;
  }

  // Selector to get the user
  @Selector([UserState])
  static getUser(state: UserStateModel) {
    return state.user;
  }

  // Selector to count the number of users
  // This selector returns the number of users in the state
  @Selector([UserState])
  static getCount(state: UserStateModel) {
    return state.users.length;
  }
}

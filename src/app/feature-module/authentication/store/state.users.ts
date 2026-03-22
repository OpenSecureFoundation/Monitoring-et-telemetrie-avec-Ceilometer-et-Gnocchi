import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Action, State, StateContext } from '@ngxs/store';
import { userHandlers } from './reducers.users';
import { Login, Logout } from './actions.users';
import { UserService } from '../users-services/users.service';

// This is the state interface for the user state
export interface UserStateModel {
  user: User;
  users: User[];
  token: string;
}

@Injectable({ providedIn: 'root' })
// this is decorator that binds the class to the state
@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: {} as User,
    users: [] as User[],
    token: '',
  },
})

// This is the state class for the user state
export class UserState {
  // The state interface for the user state
  // This is where you can define your actions and selectors
  // You can also define your initial state here
  // You can also define your reducers here
  // You can also define your effects here
  // You can also define your selectors here
  // You can also define your actions here

  constructor(private userHandlers: userHandlers) {}

  @Action(Login)
  // This is the action that will be dispatched when the user logs in
  login(ctx: StateContext<UserStateModel>, action: Login): void {
    console.log('Login action dispatched:', action, ctx);
    // Call the login handler from the userHandlers class
    this.userHandlers.loginHandler(ctx, action);
  }

  @Action(Logout)
  // This is the action that will be dispatched when the user logs out
  logout(ctx: StateContext<UserStateModel>, action: Logout): void {
    console.log('Logout action dispatched');
    this.userHandlers.logoutHandler(ctx, action);
  }
}

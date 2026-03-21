import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { StateContext } from '@ngxs/store';
import { Login, Logout } from './actions.users';
import { State } from '@ngxs/store';
import { UserService } from '../users-services/users.service';
import { UserState, UserStateModel } from './state.users';
import { catchError } from 'rxjs';
import { ToasterService } from 'src/app/core/core.index';
import { routes } from 'src/app/core/core.index';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class userHandlers {
  // This is the user reducer class
  // This is where you can define your actions and reducers
  // You can also define your initial state here
  // You can also define your effects here
  // You can also define your selectors here
  // You can also define your actions here

  constructor(
    private userService: UserService,
    private toaster: ToasterService,
    private router: Router,
  ) {}

  loginHandler(context: StateContext<UserStateModel>, action: Login): void {
    const state = context.getState();
    this.userService.loginUser(action.payload).subscribe((res) => {
      if (res) {
        console.log('res: ', res);
        context.setState({
          ...state,
          user: res.user,
          token: res.user.jwt,
        });
        this.router.navigate([`${routes.subscription}`]);
        // this.router.navigate([`${routes.superAdminDashboard}`]);
      }
    });
  }

  logoutHandler(ctx: StateContext<UserStateModel>, action: Logout) {
    const state = ctx.getState();
    this.userService.logout().subscribe((res) => {
      if (res) {
        ctx.setState({
          ...state,
          user: {} as User,
          token: '',
        });
        this.router.navigate([routes.sassLogin]);
      }
    });
  }
}

import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { UserSelectors } from 'src/app/feature-module/authentication/store/selectors.users';
import { JwtHelperService } from '@auth0/angular-jwt';
import { routes } from '../../core.index';

@Injectable({ providedIn: 'root' })

// export class AuthGuard implements CanActivate {
export class authGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store,
    private route: ActivatedRoute,
    private jwtHelper: JwtHelperService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.store.selectSnapshot(UserSelectors.getUser);
    const token = this.store.selectSnapshot(UserSelectors.getUserToken);

    if (user && user.isVerified) {
      if (this.jwtHelper.isTokenExpired(token)) {
        // jeton expiré
        this.router.navigate([routes.login]);
        return false;
      } else {
        // this.router.navigate([routes.dashboard]);
        return true; // autoriser l'accès à la route
        // jeton valide
      }
    } else {
      return false;
      // this.router.navigate([routes.login]);
    }
  }
}

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };
// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

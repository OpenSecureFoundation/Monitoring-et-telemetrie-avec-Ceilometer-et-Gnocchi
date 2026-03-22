import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngxs/store';
import { UserSelectors } from 'src/app/feature-module/authentication/store/selectors.users';
import { routes } from '../../core.index';
import { Observable } from 'rxjs';
import { UrlStorageService } from 'src/app/feature-module/authentication/users-services/url-storage.service';
import { UserService } from 'src/app/feature-module/authentication/users-services/users.service';

@Injectable({ providedIn: 'root' })
// export class SecureInnerPageGuard implements CanActivate {

export class secureInnerPageGuard implements CanActivate {

  constructor(
    private router: Router,
    private store: Store,
    private route: ActivatedRoute,
    private jwtHelper: JwtHelperService,
    private urlStorageService: UrlStorageService,
    private userService: UserService,
  ) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.store.selectSnapshot(UserSelectors.getUser);
    const token = this.store.selectSnapshot(UserSelectors.getUserToken);

    if(user && user.isVerified) {
      if (this.jwtHelper.isTokenExpired(token)) {
        // jeton expiré
        this.router.navigate([routes.login]);
        return true;
      } else {
        const lastUrl = this.urlStorageService.getLastUrl();
        if(lastUrl) {
          this.urlStorageService.clearLastUrl(); // Clear the last URL when navigating to a new page
          this.router.navigate([lastUrl || routes.dashboard]); // Navigate to the last URL or default to dashboard
        }
        return false; // rejeter l'accès à la route
      }
    } else {
      this.router.navigate([routes.login]);
      return false;
    }


  }
}













// export const secureInnerPageGuard: CanActivateFn = (route, state) => {
//   return true;
// };

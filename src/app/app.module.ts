import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/sharedIndex';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule, Store } from '@ngxs/store';
import { UserState } from './feature-module/authentication/store/state.users';
import { JWT_OPTIONS, JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { ActivatedRoute } from '@angular/router';
import { UserSelectors } from './feature-module/authentication/store/selectors.users';
import { UserService } from './feature-module/authentication/users-services/users.service';
import { ProjectState } from './feature-module/super-admin/store/project.store/state.projects';
import { AodhState } from './feature-module/super-admin/store/aodh.store/state.aodh';
// import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgApexchartsModule } from 'ng-apexcharts';

// Factory pour fournir les options JWT avec dépendances
export function jwtOptionsFactory(userService: UserService) {
  return {
    tokenGetter: () => userService.tokenGetter(),
    // allowedDomains: [...] // Si nécessaire
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgApexchartsModule,
    NgxsModule.forRoot([UserState, ProjectState, AodhState]),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [UserService], // Déclaration des dépendances
      },
    }),
    // NgxsStoragePluginModule.forRoot({
    //   keys: ['user.token'], // 🔥 uniquement le token
    // }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: 'login',
      //   pathMatch: 'full',
      // },
      {
        path: '',
        redirectTo: 'sass-login',
        pathMatch: 'full',
      },
      // {
      //   path: 'login',
      //   loadChildren: () =>
      //     import('./login/login.module').then((m) => m.LoginModule),
      // },
      // {
      //   path: 'register',
      //   loadChildren: () =>
      //     import('./register/register.module').then((m) => m.RegisterModule),
      // },
      {
        path: 'lock-screen',
        loadChildren: () =>
          import('./lock-screen/lock-screen.module').then(
            (m) => m.LockScreenModule,
          ),
      },
      // {
      //   path: 'forgot-password',
      //   loadChildren: () =>
      //     import('./forgot-password/forgot-password.module').then(
      //       (m) => m.ForgotPasswordModule,
      //     ),
      // },
      // {
      //   path: 'otp-verification/:purpose',
      //   loadChildren: () =>
      //     import('./otp-verification/otp-verification.module').then(
      //       (m) => m.OtpVerificationModule,
      //     ),
      // },
      {
        path: 'sass-login',
        loadChildren: () =>
          import('./sass-login/sass-login.module').then(
            (m) => m.SassLoginModule,
          ),
      },
      // {
      //   path: 'sass-register',
      //   loadChildren: () =>
      //     import('./sass-register/sass-register.module').then(
      //       (m) => m.SassRegisterModule,
      //     ),
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}

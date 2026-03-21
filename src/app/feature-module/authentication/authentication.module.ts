import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ForgotPasswordModule,
    SharedModule,
  ],
  exports: []
})

export class AuthenticationModule {}

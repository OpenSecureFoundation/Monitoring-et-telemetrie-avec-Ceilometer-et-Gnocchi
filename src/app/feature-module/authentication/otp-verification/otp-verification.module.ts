import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SassLoginRoutingModule } from './otp-verification-routing.module';
// import { OtpVerificationComponent  } from './otp-verification.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OtpVerificationComponent } from './otp-verification.component';


@NgModule({
  declarations: [
    OtpVerificationComponent
  ],
  imports: [
    CommonModule,
    SassLoginRoutingModule,
    SharedModule
  ]
})
export class OtpVerificationModule { }

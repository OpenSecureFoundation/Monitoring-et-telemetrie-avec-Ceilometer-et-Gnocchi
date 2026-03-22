import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpVerificationComponent } from './otp-verification.component';

const routes: Routes = [{ path: '', component: OtpVerificationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SassLoginRoutingModule {}

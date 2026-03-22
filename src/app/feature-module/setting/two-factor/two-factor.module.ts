import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TwoFactorRoutingModule } from './two-factor-routing.module';
import { TwoFactorComponent } from './two-factor.component';


@NgModule({
  declarations: [
    TwoFactorComponent
  ],
  imports: [
    CommonModule,
    TwoFactorRoutingModule
  ]
})
export class TwoFactorModule { }

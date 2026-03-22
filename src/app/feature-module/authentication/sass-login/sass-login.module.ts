import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SassLoginRoutingModule } from './sass-login-routing.module';
import { SassLoginComponent } from './sass-login.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SassLoginComponent
  ],
  imports: [
    CommonModule,
    SassLoginRoutingModule,
    SharedModule
  ]
})
export class SassLoginModule { }

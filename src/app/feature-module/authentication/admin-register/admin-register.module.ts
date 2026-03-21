import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRegisterRoutingModule } from './admin-register-routing.module';
import { AdminRegisterComponent } from './admin-register.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AdminRegisterComponent
  ],
  imports: [
    CommonModule,
    AdminRegisterRoutingModule,
    SharedModule
  ]
})
export class AdminRegisterModule { }

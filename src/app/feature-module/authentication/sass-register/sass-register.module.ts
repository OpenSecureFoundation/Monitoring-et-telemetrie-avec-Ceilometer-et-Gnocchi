import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SassRegisterRoutingModule } from './sass-register-routing.module';
import { SassRegisterComponent } from './sass-register.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SassRegisterComponent
  ],
  imports: [
    CommonModule,
    SassRegisterRoutingModule,
    SharedModule
  ]
})
export class SassRegisterModule { }

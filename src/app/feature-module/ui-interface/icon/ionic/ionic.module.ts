import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicRoutingModule } from './ionic-routing.module';
import { IonicComponent } from './ionic.component';


@NgModule({
  declarations: [
    IonicComponent
  ],
  imports: [
    CommonModule,
    IonicRoutingModule
  ]
})
export class IonicModule { }

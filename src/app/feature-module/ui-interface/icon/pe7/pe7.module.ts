import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Pe7RoutingModule } from './pe7-routing.module';
import { Pe7Component } from './pe7.component';


@NgModule({
  declarations: [
    Pe7Component
  ],
  imports: [
    CommonModule,
    Pe7RoutingModule
  ]
})
export class Pe7Module { }

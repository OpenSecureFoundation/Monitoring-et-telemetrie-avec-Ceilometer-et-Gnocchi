import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Cashreceipt3RoutingModule } from './cashreceipt3-routing.module';
import { Cashreceipt3Component } from './cashreceipt3.component';


@NgModule({
  declarations: [
    Cashreceipt3Component
  ],
  imports: [
    CommonModule,
    Cashreceipt3RoutingModule
  ]
})
export class Cashreceipt3Module { }

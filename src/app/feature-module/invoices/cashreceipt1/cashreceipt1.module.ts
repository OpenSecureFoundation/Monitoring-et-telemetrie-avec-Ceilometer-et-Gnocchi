import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Cashreceipt1RoutingModule } from './cashreceipt1-routing.module';
import { Cashreceipt1Component } from './cashreceipt1.component';


@NgModule({
  declarations: [
    Cashreceipt1Component
  ],
  imports: [
    CommonModule,
    Cashreceipt1RoutingModule
  ]
})
export class Cashreceipt1Module { }

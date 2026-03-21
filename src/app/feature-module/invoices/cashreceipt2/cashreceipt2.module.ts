import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Cashreceipt2RoutingModule } from './cashreceipt2-routing.module';
import { Cashreceipt2Component } from './cashreceipt2.component';


@NgModule({
  declarations: [
    Cashreceipt2Component
  ],
  imports: [
    CommonModule,
    Cashreceipt2RoutingModule
  ]
})
export class Cashreceipt2Module { }

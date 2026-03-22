import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Cashreceipt4RoutingModule } from './cashreceipt4-routing.module';
import { Cashreceipt4Component } from './cashreceipt4.component';


@NgModule({
  declarations: [
    Cashreceipt4Component
  ],
  imports: [
    CommonModule,
    Cashreceipt4RoutingModule
  ]
})
export class Cashreceipt4Module { }

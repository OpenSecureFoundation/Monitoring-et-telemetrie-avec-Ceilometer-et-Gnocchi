import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralInvoice1RoutingModule } from './general-invoice1-routing.module';
import { GeneralInvoice1Component } from './general-invoice1.component';


@NgModule({
  declarations: [
    GeneralInvoice1Component
  ],
  imports: [
    CommonModule,
    GeneralInvoice1RoutingModule
  ]
})
export class GeneralInvoice1Module { }

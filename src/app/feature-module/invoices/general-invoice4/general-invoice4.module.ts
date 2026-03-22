import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralInvoice4RoutingModule } from './general-invoice4-routing.module';
import { GeneralInvoice4Component } from './general-invoice4.component';


@NgModule({
  declarations: [
    GeneralInvoice4Component
  ],
  imports: [
    CommonModule,
    GeneralInvoice4RoutingModule
  ]
})
export class GeneralInvoice4Module { }

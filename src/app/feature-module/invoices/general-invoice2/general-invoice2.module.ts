import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralInvoice2RoutingModule } from './general-invoice2-routing.module';
import { GeneralInvoice2Component } from './general-invoice2.component';


@NgModule({
  declarations: [
    GeneralInvoice2Component
  ],
  imports: [
    CommonModule,
    GeneralInvoice2RoutingModule
  ]
})
export class GeneralInvoice2Module { }

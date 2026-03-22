import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralInvoice5RoutingModule } from './general-invoice5-routing.module';
import { GeneralInvoice5Component } from './general-invoice5.component';


@NgModule({
  declarations: [
    GeneralInvoice5Component
  ],
  imports: [
    CommonModule,
    GeneralInvoice5RoutingModule
  ]
})
export class GeneralInvoice5Module { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralInvoice3RoutingModule } from './general-invoice3-routing.module';
import { GeneralInvoice3Component } from './general-invoice3.component';


@NgModule({
  declarations: [
    GeneralInvoice3Component
  ],
  imports: [
    CommonModule,
    GeneralInvoice3RoutingModule
  ]
})
export class GeneralInvoice3Module { }

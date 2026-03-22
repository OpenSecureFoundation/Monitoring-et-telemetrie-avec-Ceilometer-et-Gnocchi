import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceFourRoutingModule } from './invoice-four-routing.module';
import { InvoiceFourComponent } from './invoice-four.component';


@NgModule({
  declarations: [
    InvoiceFourComponent
  ],
  imports: [
    CommonModule,
    InvoiceFourRoutingModule
  ]
})
export class InvoiceFourModule { }

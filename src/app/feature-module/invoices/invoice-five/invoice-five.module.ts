import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceFiveRoutingModule } from './invoice-five-routing.module';
import { InvoiceFiveComponent } from './invoice-five.component';


@NgModule({
  declarations: [
    InvoiceFiveComponent
  ],
  imports: [
    CommonModule,
    InvoiceFiveRoutingModule
  ]
})
export class InvoiceFiveModule { }

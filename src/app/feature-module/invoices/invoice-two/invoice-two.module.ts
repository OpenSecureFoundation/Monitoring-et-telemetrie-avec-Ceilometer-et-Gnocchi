import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceTwoRoutingModule } from './invoice-two-routing.module';
import { InvoiceTwoComponent } from './invoice-two.component';


@NgModule({
  declarations: [
    InvoiceTwoComponent
  ],
  imports: [
    CommonModule,
    InvoiceTwoRoutingModule
  ]
})
export class InvoiceTwoModule { }

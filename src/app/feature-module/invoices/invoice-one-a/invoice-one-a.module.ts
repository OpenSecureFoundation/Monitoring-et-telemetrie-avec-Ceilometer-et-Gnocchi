import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceOneARoutingModule } from './invoice-one-a-routing.module';
import { InvoiceOneAComponent } from './invoice-one-a.component';


@NgModule({
  declarations: [
    InvoiceOneAComponent
  ],
  imports: [
    CommonModule,
    InvoiceOneARoutingModule
  ]
})
export class InvoiceOneAModule { }

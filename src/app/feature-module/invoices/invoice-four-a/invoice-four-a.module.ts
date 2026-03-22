import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceFourARoutingModule } from './invoice-four-a-routing.module';
import { InvoiceFourAComponent } from './invoice-four-a.component';


@NgModule({
  declarations: [
    InvoiceFourAComponent
  ],
  imports: [
    CommonModule,
    InvoiceFourARoutingModule
  ]
})
export class InvoiceFourAModule { }

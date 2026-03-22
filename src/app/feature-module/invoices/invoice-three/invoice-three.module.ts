import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceThreeRoutingModule } from './invoice-three-routing.module';
import { InvoiceThreeComponent } from './invoice-three.component';


@NgModule({
  declarations: [
    InvoiceThreeComponent
  ],
  imports: [
    CommonModule,
    InvoiceThreeRoutingModule
  ]
})
export class InvoiceThreeModule { }

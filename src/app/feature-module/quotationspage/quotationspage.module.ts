import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotationspageRoutingModule } from './quotationspage-routing.module';
import { QuotationspageComponent } from './quotationspage.component';


@NgModule({
  declarations: [
    QuotationspageComponent
  ],
  imports: [
    CommonModule,
    QuotationspageRoutingModule
  ]
})
export class QuotationspageModule { }

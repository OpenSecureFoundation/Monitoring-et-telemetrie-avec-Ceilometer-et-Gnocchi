import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceOneRoutingModule } from './invoice-one-routing.module';
import { InvoiceOneComponent } from './invoice-one.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    InvoiceOneComponent
  ],
  imports: [
    CommonModule,
    InvoiceOneRoutingModule,
    SharedModule
  ]
})
export class InvoiceOneModule { }

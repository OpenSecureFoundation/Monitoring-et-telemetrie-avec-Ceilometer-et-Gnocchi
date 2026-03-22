import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesUnpaidRoutingModule } from './invoices-unpaid-routing.module';
import { InvoicesUnpaidComponent } from './invoices-unpaid.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    InvoicesUnpaidComponent
  ],
  imports: [
    CommonModule,
    InvoicesUnpaidRoutingModule,
    SharedModule
  ]
})
export class InvoicesUnpaidModule { }

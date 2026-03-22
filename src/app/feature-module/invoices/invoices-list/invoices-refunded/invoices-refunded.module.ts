import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRefundedRoutingModule } from './invoices-refunded-routing.module';
import { InvoicesRefundedComponent } from './invoices-refunded.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    InvoicesRefundedComponent
  ],
  imports: [
    CommonModule,
    InvoicesRefundedRoutingModule,
    SharedModule
  ]
})
export class InvoicesRefundedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecurringInvoicesRoutingModule } from './recurring-invoices-routing.module';
import { RecurringInvoicesComponent } from './recurring-invoices.component';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
  declarations: [
    RecurringInvoicesComponent
  ],
  imports: [
    CommonModule,
    RecurringInvoicesRoutingModule,
    SharedModule
 
  ]
})
export class RecurringInvoicesModule { }

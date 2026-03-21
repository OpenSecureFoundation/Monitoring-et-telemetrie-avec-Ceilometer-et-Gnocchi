import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MailPayInvoiceRoutingModule } from './mail-pay-invoice-routing.module';
import { MailPayInvoiceComponent } from './mail-pay-invoice.component';


@NgModule({
  declarations: [
    MailPayInvoiceComponent
  ],
  imports: [
    CommonModule,
    MailPayInvoiceRoutingModule
  ]
})
export class MailPayInvoiceModule { }

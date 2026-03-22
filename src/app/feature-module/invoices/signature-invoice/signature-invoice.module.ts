import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignatureInvoiceRoutingModule } from './signature-invoice-routing.module';
import { SignatureInvoiceComponent } from './signature-invoice.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SignatureInvoiceComponent
  ],
  imports: [
    CommonModule,
    SignatureInvoiceRoutingModule,
    SharedModule
  ]
})
export class SignatureInvoiceModule { }

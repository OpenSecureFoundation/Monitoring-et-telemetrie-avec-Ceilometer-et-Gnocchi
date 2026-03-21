import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignaturePreviewInvoiceRoutingModule } from './signature-preview-invoice-routing.module';
import { SignaturePreviewInvoiceComponent } from './signature-preview-invoice.component';


@NgModule({
  declarations: [
    SignaturePreviewInvoiceComponent
  ],
  imports: [
    CommonModule,
    SignaturePreviewInvoiceRoutingModule
  ]
})
export class SignaturePreviewInvoiceModule { }

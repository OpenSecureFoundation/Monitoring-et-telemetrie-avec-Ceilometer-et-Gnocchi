import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateInvoiceRoutingModule } from './template-invoice-routing.module';
import { TemplateInvoiceComponent } from './template-invoice.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TemplateInvoiceComponent
  ],
  imports: [
    CommonModule,
    TemplateInvoiceRoutingModule,
    SharedModule
  ]
})
export class TemplateInvoiceModule { }

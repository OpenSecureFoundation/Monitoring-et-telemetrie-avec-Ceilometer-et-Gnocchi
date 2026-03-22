import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceTemplateRoutingModule } from './invoice-template-routing.module';
import { InvoiceTemplateComponent } from './invoice-template.component';


@NgModule({
  declarations: [
    InvoiceTemplateComponent
  ],
  imports: [
    CommonModule,
    InvoiceTemplateRoutingModule
  ]
})
export class InvoiceTemplateModule { }

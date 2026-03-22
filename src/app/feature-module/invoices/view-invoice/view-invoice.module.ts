import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewInvoiceComponent } from './view-invoice.component';
import { ViewInvoiceRoutingModule } from './view-invoice-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ViewInvoiceComponent],
  imports: [CommonModule, ViewInvoiceRoutingModule, SharedModule],
})
export class ViewInvoiceModule {}

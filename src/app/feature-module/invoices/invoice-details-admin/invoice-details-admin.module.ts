import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceDetailsAdminRoutingModule } from './invoice-details-admin-routing.module';
import { InvoiceDetailsAdminComponent } from './invoice-details-admin.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    InvoiceDetailsAdminComponent
  ],
  imports: [
    CommonModule,
    InvoiceDetailsAdminRoutingModule,
    SharedModule
  ]
})
export class InvoiceDetailsAdminModule { }

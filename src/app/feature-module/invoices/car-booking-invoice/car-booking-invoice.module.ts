import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarBookingInvoiceRoutingModule } from './car-booking-invoice-routing.module';
import { CarBookingInvoiceComponent } from './car-booking-invoice.component';


@NgModule({
  declarations: [
    CarBookingInvoiceComponent
  ],
  imports: [
    CommonModule,
    CarBookingInvoiceRoutingModule
  ]
})
export class CarBookingInvoiceModule { }

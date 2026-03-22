import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightBookingInvoiceRoutingModule } from './flight-booking-invoice-routing.module';
import { FlightBookingInvoiceComponent } from './flight-booking-invoice.component';


@NgModule({
  declarations: [
    FlightBookingInvoiceComponent
  ],
  imports: [
    CommonModule,
    FlightBookingInvoiceRoutingModule
  ]
})
export class FlightBookingInvoiceModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightBookingInvoiceComponent } from './flight-booking-invoice.component';

const routes: Routes = [{ path: '', component: FlightBookingInvoiceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightBookingInvoiceRoutingModule { }

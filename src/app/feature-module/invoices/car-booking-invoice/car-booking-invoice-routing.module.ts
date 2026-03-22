import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarBookingInvoiceComponent } from './car-booking-invoice.component';

const routes: Routes = [{ path: '', component: CarBookingInvoiceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarBookingInvoiceRoutingModule { }

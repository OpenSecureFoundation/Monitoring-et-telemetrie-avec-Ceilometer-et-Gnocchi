import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainTicketBookingRoutingModule } from './train-ticket-booking-routing.module';
import { TrainTicketBookingComponent } from './train-ticket-booking.component';


@NgModule({
  declarations: [
    TrainTicketBookingComponent
  ],
  imports: [
    CommonModule,
    TrainTicketBookingRoutingModule
  ]
})
export class TrainTicketBookingModule { }

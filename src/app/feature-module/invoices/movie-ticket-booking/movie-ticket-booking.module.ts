import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieTicketBookingRoutingModule } from './movie-ticket-booking-routing.module';
import { MovieTicketBookingComponent } from './movie-ticket-booking.component';


@NgModule({
  declarations: [
    MovieTicketBookingComponent
  ],
  imports: [
    CommonModule,
    MovieTicketBookingRoutingModule
  ]
})
export class MovieTicketBookingModule { }

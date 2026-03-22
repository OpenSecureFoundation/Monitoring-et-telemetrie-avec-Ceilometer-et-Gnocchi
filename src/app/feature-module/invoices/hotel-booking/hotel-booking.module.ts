import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelBookingRoutingModule } from './hotel-booking-routing.module';
import { HotelBookingComponent } from './hotel-booking.component';


@NgModule({
  declarations: [
    HotelBookingComponent
  ],
  imports: [
    CommonModule,
    HotelBookingRoutingModule
  ]
})
export class HotelBookingModule { }

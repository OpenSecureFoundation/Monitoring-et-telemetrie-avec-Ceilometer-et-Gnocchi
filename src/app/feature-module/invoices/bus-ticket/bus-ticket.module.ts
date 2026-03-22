import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusTicketRoutingModule } from './bus-ticket-routing.module';
import { BusTicketComponent } from './bus-ticket.component';


@NgModule({
  declarations: [
    BusTicketComponent
  ],
  imports: [
    CommonModule,
    BusTicketRoutingModule
  ]
})
export class BusTicketModule { }

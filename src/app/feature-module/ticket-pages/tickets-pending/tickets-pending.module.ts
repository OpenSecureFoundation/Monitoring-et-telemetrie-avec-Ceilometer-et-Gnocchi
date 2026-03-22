import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsPendingRoutingModule } from './tickets-pending-routing.module';
import { TicketsPendingComponent } from './tickets-pending.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TicketsPendingComponent
  ],
  imports: [
    CommonModule,
    TicketsPendingRoutingModule,
    SharedModule
  ]
})
export class TicketsPendingModule { }

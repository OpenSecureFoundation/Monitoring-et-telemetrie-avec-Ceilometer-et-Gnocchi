import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsListPendingRoutingModule } from './tickets-list-pending-routing.module';
import { TicketsListPendingComponent } from './tickets-list-pending.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TicketsListPendingComponent
  ],
  imports: [
    CommonModule,
    TicketsListPendingRoutingModule,
    SharedModule
  ]
})
export class TicketsListPendingModule { }

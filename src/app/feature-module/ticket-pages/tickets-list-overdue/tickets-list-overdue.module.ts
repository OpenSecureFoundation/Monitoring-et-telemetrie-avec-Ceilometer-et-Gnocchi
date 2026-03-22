import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsListOverdueRoutingModule } from './tickets-list-overdue-routing.module';
import { TicketsListOverdueComponent } from './tickets-list-overdue.component';


@NgModule({
  declarations: [
    TicketsListOverdueComponent
  ],
  imports: [
    CommonModule,
    TicketsListOverdueRoutingModule
  ]
})
export class TicketsListOverdueModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsListRecurringRoutingModule } from './tickets-list-recurring-routing.module';
import { TicketsListRecurringComponent } from './tickets-list-recurring.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TicketsListRecurringComponent
  ],
  imports: [
    CommonModule,
    TicketsListRecurringRoutingModule,
    SharedModule
  ]
})
export class TicketsListRecurringModule { }

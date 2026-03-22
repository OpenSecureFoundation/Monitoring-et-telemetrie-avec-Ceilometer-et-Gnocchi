import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRecurringRoutingModule } from './tickets-recurring-routing.module';
import { TicketsRecurringComponent } from './tickets-recurring.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TicketsRecurringComponent
  ],
  imports: [
    CommonModule,
    TicketsRecurringRoutingModule,
    SharedModule
  ]
})
export class TicketsRecurringModule { }

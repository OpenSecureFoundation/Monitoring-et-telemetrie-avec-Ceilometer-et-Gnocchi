import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsOverdueRoutingModule } from './tickets-overdue-routing.module';
import { TicketsOverdueComponent } from './tickets-overdue.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TicketsOverdueComponent
  ],
  imports: [
    CommonModule,
    TicketsOverdueRoutingModule,
    SharedModule
  ]
})
export class TicketsOverdueModule { }

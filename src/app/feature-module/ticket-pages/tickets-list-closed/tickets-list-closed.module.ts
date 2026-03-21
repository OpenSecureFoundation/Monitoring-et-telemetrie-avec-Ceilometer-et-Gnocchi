import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsListClosedRoutingModule } from './tickets-list-closed-routing.module';
import { TicketsListClosedComponent } from './tickets-list-closed.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TicketsListClosedComponent
  ],
  imports: [
    CommonModule,
    TicketsListClosedRoutingModule,
    SharedModule
  ]
})
export class TicketsListClosedModule { }

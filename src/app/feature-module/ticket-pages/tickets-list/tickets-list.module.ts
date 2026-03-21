import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsListRoutingModule } from './tickets-list-routing.module';
import { TicketsListComponent } from './tickets-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TicketsListComponent
  ],
  imports: [
    CommonModule,
    TicketsListRoutingModule,
    SharedModule
  ]
})
export class TicketsListModule { }

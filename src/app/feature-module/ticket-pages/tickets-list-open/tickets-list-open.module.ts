import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsListOpenRoutingModule } from './tickets-list-open-routing.module';
import { TicketsListOpenComponent } from './tickets-list-open.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TicketsListOpenComponent
  ],
  imports: [
    CommonModule,
    TicketsListOpenRoutingModule,
    SharedModule
  ]
})
export class TicketsListOpenModule { }

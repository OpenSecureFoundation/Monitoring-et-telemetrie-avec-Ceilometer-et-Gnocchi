import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsOpenRoutingModule } from './tickets-open-routing.module';
import { TicketsOpenComponent } from './tickets-open.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TicketsOpenComponent
  ],
  imports: [
    CommonModule,
    TicketsOpenRoutingModule,
    SharedModule
  ]
})
export class TicketsOpenModule { }

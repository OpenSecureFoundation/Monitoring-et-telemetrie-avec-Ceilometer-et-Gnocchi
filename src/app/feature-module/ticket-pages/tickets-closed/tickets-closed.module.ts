import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsClosedRoutingModule } from './tickets-closed-routing.module';
import { TicketsClosedComponent } from './tickets-closed.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    TicketsClosedComponent
  ],
  imports: [
    CommonModule,
    TicketsClosedRoutingModule,
    SharedModule
    
  ]
})
export class TicketsClosedModule { }
